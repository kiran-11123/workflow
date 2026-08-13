import axios from 'axios';
export async function checkWorkFlowService() {
    const response = await axios.get('http://localhost:5000/health');
    return response.data;
}
//# sourceMappingURL=workflow.client.js.map