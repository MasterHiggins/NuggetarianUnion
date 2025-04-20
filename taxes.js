//Constants for tax rates - standard
const STANDARD_RATE_BUSINESS = 0.07;
const STANDARD_RATE_INDIVIDUAL = 0.05;
const STANDARD_RATE_SALES = 0.04;
const STANDARD_RATE_INCOME = 0.04;
const STANDARD_CREDIT = -75;

//Constants for tax rates - alternate
const ALTERNATE_RATE_BUSINESS = 0.035;
const ALTERNATE_RATE_INDIVIDUAL = 0.025;
const ALTERNATE_RATE_SALES = 0.02;
const ALTERNATE_RATE_INCOME = 0.02;
const ALTERNATE_CREDIT = -75;

//Top Tax threshold and rate
const TOP_TAX_THRESHOLD = 3000;
const TOP_TAX_RATE = 0.1;

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

    const totalClaimed = individualTax + businessTax + salesTax + incomeTax;

    const topTax = totalClaimed > TOP_TAX_THRESHOLD ? totalClaimed * TOP_TAX_RATE : 0;

    const totalTax = individualTaxAmount + businessTaxAmount + salesTaxAmount + incomeTaxAmount + credit + topTax;

    document.getElementById("total-tax").textContent = Math.round(totalTax.toFixed(2));

    const breakdown = `
        <p>Total Amount Claimed: ${totalClaimed.toFixed(2)}</p>
        <p>Individual Tax (${(individualRate * 100).toFixed(1)}%): ${individualTaxAmount.toFixed(2)}</p>
        <p>Business Tax (${(businessRate * 100).toFixed(1)}%): ${businessTaxAmount.toFixed(2)}</p>
        <p>Sales Tax (${(salesRate * 100).toFixed(1)}%): ${salesTaxAmount.toFixed(2)}</p>
        <p>Income Tax (${(incomeRate * 100).toFixed(1)}%): ${incomeTaxAmount.toFixed(2)}</p>
        <p>Top Tax (${(TOP_TAX_RATE * 100).toFixed(1)}% on amounts over ${TOP_TAX_THRESHOLD}): ${topTax.toFixed(2)}</p>
        <p>Total Before Credit: ${(individualTaxAmount + businessTaxAmount + salesTaxAmount + incomeTaxAmount + topTax).toFixed(2)}</p>
        <p>Credit: ${credit.toFixed(2)}</p>
        <p>Total Tax Before Rounding: ${totalTax.toFixed(2)}</p>
        <p>Total Tax Owing/Owed: ${Math.round(totalTax.toFixed(2))}</p>
    `;

    // Generate ReferenceNumber
    const referenceNumber = btoa(
        `${individualTax}-${businessTax}-${salesTax}-${incomeTax}-${useAlternateRate}`
    );

    const referenceSection = `
        <p><b>Reference Number:</b> ${referenceNumber}</p>
    `;

    document.getElementById("tax-breakdown").innerHTML = breakdown + referenceSection;
}