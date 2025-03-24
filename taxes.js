//Constants for tax rates - standard
const STANDARD_RATE_BUSINESS = 0.10;
const STANDARD_RATE_INDIVIDUAL = 0.07;
const STANDARD_RATE_SALES = 0.05;
const STANDARD_RATE_INCOME = 0.05;
const STANDARD_CREDIT = -25;

//Constants for tax rates - alternate
const ALTERNATE_RATE_BUSINESS = 0.05;
const ALTERNATE_RATE_INDIVIDUAL = 0.02;
const ALTERNATE_RATE_SALES = 0.00;
const ALTERNATE_RATE_INCOME = 0.00;
const ALTERNATE_CREDIT = -50;

function calculateTax() {
    const individualTax = parseFloat(document.getElementById("individual-tax").value) || 0;
    const businessTax = parseFloat(document.getElementById("business-tax").value) || 0;
    const salesTax = parseFloat(document.getElementById("sales-tax").value) || 0;
    const incomeTax = parseFloat(document.getElementById("income-tax").value) || 0;

    const useAlternateRate = document.getElementById("adjust-rate").checked;

    const individualRate = useAlternateRate ? ALTERNATE_RATE_INDIVIDUAL : STANDARD_RATE_INDIVIDUAL;
    const businessRate = useAlternateRate ? ALTERNATE_RATE_BUSINESS : STANDARD_RATE_BUSINESS;
    const salesRate = useAlternateRate ? ALTERNATE_RATE_SALES : STANDARD_RATE_SALES;
    const incomeRate = useAlternateRate ? ALTERNATE_RATE_INCOME : STANDARD_RATE_INCOME;
    const credit = useAlternateRate ? ALTERNATE_CREDIT : STANDARD_CREDIT;

    const individualTaxAmount = individualTax * individualRate;
    const businessTaxAmount = businessTax * businessRate;
    const salesTaxAmount = salesTax * salesRate;
    const incomeTaxAmount = incomeTax * incomeRate;

    const totalTax = individualTaxAmount + businessTaxAmount + salesTaxAmount + incomeTaxAmount + credit;

    document.getElementById("total-tax").textContent = Math.round(totalTax.toFixed(2));

    const breakdown = `
        <p>Total Amount Claimed: ${(individualTax + businessTax + salesTax + incomeTax)}</p>
        <p>Individual Tax (${(individualRate * 100).toFixed(1)}%): ${individualTaxAmount.toFixed(2)}</p>
        <p>Business Tax (${(businessRate * 100).toFixed(1)}%): ${businessTaxAmount.toFixed(2)}</p>
        <p>Sales Tax (${(salesRate * 100).toFixed(1)}%): ${salesTaxAmount.toFixed(2)}</p>
        <p>Income Tax (${(incomeRate * 100).toFixed(1)}%): ${incomeTaxAmount.toFixed(2)}</p>
        <p>Total Before Credit: ${((individualTaxAmount + businessTaxAmount + salesTaxAmount + incomeTaxAmount).toFixed(2))}</p>
        <p>Credit: ${credit.toFixed(2)}</p>
        <p>Total Tax Before Rounding: ${totalTax.toFixed(2)}</p>
        <p>Total Tax Owing/Owed: ${Math.round(totalTax.toFixed(2))}</p>
    `;
    document.getElementById("tax-breakdown").innerHTML = breakdown;
}