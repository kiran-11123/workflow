import kafka from "./kafka.connection.js";
import workflow_producer from "./workflow.producer.js";
import axios from 'axios'
import logger from "../utils/logger.setup.js";
const signup_flow_consumer  = kafka.consumer({
    groupId : 'signup-group'
})


export async function ConnectConsumer(){

    await signup_flow_consumer.connect()
    logger.info(`Kafka Workflow consumer is connected`)

    await signup_flow_consumer.subscribe({
        topic : 'workflow-topic',
        fromBeginning : true
    })

    await signup_flow_consumer.run({
        eachMessage : async({topic , partition, message})=>{
            const data = JSON.parse(message.value?.toString() || "{}")
            
            const email = data.email;
            const idempotent_key   = data.idempotent_key

            let retries = 0;

            while(retries < 3){
                  
                try{
                const response = await axios.post('http://localhost:5000/api/workflow/execute/signup' , {
                    idempotent_key  :idempotent_key,
                    email :email,
                    workflow_name : "Signup Flow"
                } )

                if(response.status === 200){
                      logger.info(`Signup workflow executed successfully for email ${email}`)
                }
             
            }
            catch(er){
                 logger.info(`Error occured while sending the data ${email} to signup workflow`)
                 retries+=1;
            }
              
        }

        }
    })


}