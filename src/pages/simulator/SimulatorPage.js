import { logAudit } from "../../services/auditService";

async function runModel(userInputs) {

const result = await simulatePolicy(userInputs);

await logAudit("MODEL_ACCESSED", {

inputs: userInputs,

output: result

});

return result;

}