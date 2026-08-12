import kafka from "./kafka.connection.js";
import workflow_producer from "./workflow.producer.js";
import axios from 'axios'
import logger from "../utils/logger.setup.js";
import { sendToDLQ } from "./workflow_dlq.js";
const signup_flow_consumer = kafka.consumer({
    groupId: 'signup-group-v2'
})


export async function ConnectConsumer() {

    await signup_flow_consumer.connect()
    logger.info(`Kafka Workflow consumer is connected`)

    await signup_flow_consumer.subscribe({
        topic: 'workflow-topic',
        fromBeginning: true
    })

    logger.info(`Consumer for Signup flow is triggred`)

    await signup_flow_consumer.run({
        autoCommit : false,
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value?.toString() || "{}")

            const email = data.email;
            const to = data.to;
            const idempotent_key = data.idempotent_key

            if (!email || !to || !idempotent_key) {
                await sendToDLQ(message, new Error(`Required fileds are missing`))

                await signup_flow_consumer.commitOffsets([
                    {
                        topic,
                        partition,
                        offset : (
                            Number(message.offset)+1
                        ).toString()
                    }
                ])
                throw new Error(`Data is missing in workflow topic`)

            }

            let retries = 0;
            let success = false;

            while (retries < 3) {

                logger.info(`Request for Signup workflow is sending for email ${email}`)

                try {
                    const response = await axios.post(`http://localhost:5000/api/workflow/execute/signup`, {
                        idempotent_key: idempotent_key,
                        email: email,
                        workflow_name: to
                    })

                    if (response.status === 200) {
                        logger.info(`Signup workflow executed successfully for email ${email}`)
                    }
                    success = true
                    break;

                }
                catch (er: any) {

                    retries += 1;

                    logger.error(
                        `Error while sending signup workflow request for ${email}`
                    );

                    logger.error(
                        `Attempt: ${retries}`
                    );

                    logger.error(
                        `Error message: ${er.message}`
                    );

                    logger.error(
                        `Status: ${er.response?.status}`
                    );

                    logger.error(
                        `Response: ${JSON.stringify(er.response?.data)}`
                    );

                    logger.error(
                        `URL: ${er.config?.url}`
                    );


                    if (retries === 3) {
                        logger.error(`Maximum retries reached for ${email}. Sending message to DLQ`);

                        await sendToDLQ(message, er);
                        logger.info(`Message moved to DLQ for email ${email}`)

                        break;



                    }


                }

               

            }

               if(success || retries===3){
                    await signup_flow_consumer.commitOffsets([
                        {
                            topic,
                            partition,
                            offset : (
                                 Number(message.offset)+1
                            ).toString()
                        }
                    ])
                    logger.info(
                `Offset ${Number(message.offset) + 1} committed`
            );
                }

          

        }

        
    })


}