const { DefaultAzureCredential } = require("@azure/identity");
const { CostManagementClient } = require("@azure/arm-costmanagement");

module.exports = async function (context, req) {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "---- ---- -----";
  const resourceGroupName = "---- ---- ----";
  context.log("Hello Navid!");

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const client = new CostManagementClient(credential, subscriptionId);
  const response = await client.forecast.usage(
    resourceGroupName,
    { grain: "monthly", startDate: firstDayOfMonth.toISOString().split("T")[0], endDate: lastDayOfMonth.toISOString().split("T")[0] }
  );

  const totalCost = response.properties[0].amount;

  context.log(`Total cost of ${resourceGroupName} is: ${totalCost}`);
  context.res = { body: `Total cost of ${resourceGroupName} is: ${totalCost}` };
};
