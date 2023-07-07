const { DefaultAzureCredential } = require("@azure/identity");    // Import all the modules you need to use
const { CostManagementClient } = require("@azure/arm-costmanagement"); // Import all the modules you need to use

module.exports = async function (context, req) {  // this is a method
  const credential = new DefaultAzureCredential(); // variables to use
  const subscriptionId = process.env.AzureSubscriptionId; // variables to use 
  
  const currentDate = new Date(); // method assigning value
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // method assigning value
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // method assigning value

  const client = new CostManagementClient(credential, subscriptionId); // Object
  const response = await client.forecast.usage(
    "/",
    { grain: "monthly", startDate: firstDayOfMonth.toISOString().split("T")[0], endDate: lastDayOfMonth.toISOString().split("T")[0] } //timeline
  );

  const totalCost = response.properties[0].amount;

  context.log(`Total cost of subscription ${subscriptionId} for the month is: ${totalCost}`); //print
  context.res = { body: `Total cost of subscription ${subscriptionId} for the month is: ${totalCost}` };
};
