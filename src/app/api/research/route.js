import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { company, website, linkedin, contact, email, websiteText, linkedinText, ddgText, apolloContext } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not set in environment variables." }, { status: 500 });
    }

    const sources = [
      websiteText  ? `== WEBSITE CONTENT ==\n${websiteText}`  : "== WEBSITE: not scraped ==",
      linkedinText ? `== LINKEDIN PAGE ==\n${linkedinText}`   : "== LINKEDIN: not scraped ==",
      ddgText      ? `== WEB SEARCH RESULTS ==\n${ddgText}`   : "== WEB SEARCH: no results ==",
    ].join("\n\n");

    const apollo = apolloContext || {};
    const apolloSection = apollo.industry ? `
== APOLLO CRM DATA (verified) ==
- Industry: ${apollo.industry}
- Employees: ${apollo.employees}
- Country/City: ${apollo.country}${apollo.city ? `, ${apollo.city}` : ""}
- Contact title: ${apollo.title} (${apollo.seniority} level, ${apollo.department} dept)
- Technologies: ${apollo.technologies || "unknown"}
- Keywords: ${apollo.keywords || "none"}
- Funding stage: ${apollo.latestFunding || "unknown"} | Amount: ${apollo.latestFundingAmount ? `$${apollo.latestFundingAmount.toLocaleString()}` : "unknown"}
- Total raised: ${apollo.totalFunding ? `$${apollo.totalFunding.toLocaleString()}` : "unknown"}
- Last raised: ${apollo.lastRaisedAt || "unknown"}
- Annual revenue: ${apollo.annualRevenue ? `$${apollo.annualRevenue.toLocaleString()}` : "unknown"}
` : "";

    const prompt = `You are a senior B2B sales analyst at a Data & AI consulting firm.

Our services:
- Power BI dashboards & self-service analytics
- Data Engineering (pipelines, warehouses, dbt, Spark, Azure/AWS)
- AI/ML solutions (predictive models, forecasting, NLP, automation)

Target company:
- Company: ${company}
- Website: ${website || "unknown"}
- Contact: ${contact || "unknown"} ${email ? `(${email})` : ""}
${apolloSection}
Research data (live scraped):
${sources}

IMPORTANT: Even if data is sparse, use industry knowledge to infer challenges. Keep values concise.

Return ONLY a raw JSON object — no markdown, no backticks, start with { end with }:
{"company_summary":"what they do","industry_guess":"vertical","data_maturity":"low or medium or high","data_maturity_reason":"brief reason","top_pain_points":[{"pain":"challenge","evidence":"why","urgency":"high"},{"pain":"challenge","evidence":"why","urgency":"medium"},{"pain":"challenge","evidence":"why","urgency":"low"}],"best_service_fit":{"primary":"Power BI or Data Engineering or AI/ML","reason":"why","upsell":"second service"},"triggers":[{"trigger":"signal","type":"growth or hiring or tech or pain or industry"},{"trigger":"signal","type":"type"}],"tech_clues":["tech1","tech2"],"personalization_hooks":["email 1 opener","followup angle"],"recommended_angle":"outreach story","subject_line":"max 8 word subject","confidence":"high or medium or low"}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    if (data.error) return NextResponse.json({ error: data.error.message }, { status: 400 });

    const rawText = data.content[0].text;
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return NextResponse.json({ error: "No JSON in response", raw: rawText.slice(0, 300) }, { status: 500 });

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      const stripped = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
      const m2 = stripped.match(/\{[\s\S]*\}/);
      parsed = m2 ? JSON.parse(m2[0]) : null;
    }

    if (!parsed) return NextResponse.json({ error: "Could not parse Claude response" }, { status: 500 });
    return NextResponse.json({ result: parsed });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
