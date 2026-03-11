"use client";
import { useState, useMemo, useEffect } from "react";

// ── REAL APOLLO DATA ─────────────────────────────────────────────────────────
const CONTACTS = [
  { "id": 1, "firstName": "Dhia", "lastName": "Bouajina", "title": "Head of Strategy & Operations", "company": "GitGuardian", "email": "dhia.bouajina@gitguardian.com", "emailStatus": "Verified", "seniority": "Head", "department": "Operations", "employees": 180, "industry": "computer & network security", "website": "https://gitguardian.com", "linkedinPerson": "http://www.linkedin.com/in/dhia-bouajina-50608713a", "linkedinCompany": "http://www.linkedin.com/company/gitguardian", "country": "France", "city": "Paris", "technologies": "Cloudflare DNS, Route 53, Gmail, Google Apps, Microsoft Office 365, Amazon AWS, Atlassian Cloud, React Redux, GitHub Hosting, Webflow, Sprig, Marketo, Hubspot, Slack, Salesforce, Hotjar, Facebook Login (Connect), Google Analytics, Django, Facebook Custom Audiences, Google Tag Manager, Google Font API, YouTube, Bing Ads, Typekit, Mobile Friendly, Content.ad, Segment.io, Ruby On Rails, DoubleClick, ", "keywords": "cybersecurity, data loss prevention, application security testing, application security, code security, machine learning, supply chain security, devsecops, api cloud integrations, cyber security, secr", "annualRevenue": 13200000, "totalFunding": 106320000, "latestFunding": "Series C", "latestFundingAmount": 50000000, "lastRaisedAt": "2026-02-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 2, "firstName": "Sofia", "lastName": "Martinez Bravo", "title": "Head of Legal / Secretary of the Board of Directors", "company": "Lynx Tech", "email": "sofia.martinez@lynxtech.com", "emailStatus": "Verified", "seniority": "Head", "department": "Legal, Operations", "employees": 120, "industry": "information technology & services", "website": "https://lynxtech.com", "linkedinPerson": "http://www.linkedin.com/in/sof%c3%ada-mart%c3%adnez-bravo-995681103", "linkedinCompany": "http://www.linkedin.com/company/lynxtech-ai", "country": "Spain", "city": "Madrid", "technologies": "Route 53, Microsoft Office 365, Salesforce, Outlook, Slack, Hubspot, Atlassian Cloud, React, reCAPTCHA, Incapsula, Google Tag Manager, Mobile Friendly, Apache, WordPress.org, Google Dynamic Remarketing, Linkedin Login, Bing Ads, Google Analytics, DoubleClick Conversion, Linkedin Widget, DoubleClick, Facebook Widget, YouTube, Facebook Login (Connect), Docker, AI, IoT, Remote, Python, REST, Elastics", "keywords": "transaction screening, sanction risk detection, antimoney laundering, machine learning, sanctions screening, aml, bank fraud, behavioral monitoring, financial crime prevention, customer screening, tra", "annualRevenue": 140000000, "totalFunding": 18700000, "latestFunding": "Series A", "latestFundingAmount": 18700000, "lastRaisedAt": "2023-11-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 3, "firstName": "Richard", "lastName": "Pass", "title": "Director of Strategy & Operations", "company": "STARK", "email": "richard.pass@stark-defence.com", "emailStatus": "Verified", "seniority": "Director", "department": "Operations", "employees": 110, "industry": "defense & space", "website": "https://stark-defence.com", "linkedinPerson": "http://www.linkedin.com/in/richard-pass-1a511414", "linkedinCompany": "http://www.linkedin.com/company/stark-defence", "country": "United Kingdom", "city": "London", "technologies": "Gmail, Google Apps, Slack, Mobile Friendly, WordPress.org, Nginx, Google Tag Manager, Jira, Confluence, Cadence Omnis CFD Platform, NetSuite, Azure Linux Virtual Machines, Wireshark, Juniper Firewall, ACL, C#, NVIDIA Jetson, Oracle NetSuite, Dassault SOLIDWORKS, CATIA, Altium Designer, CAT, 3DEXPERIENCE Platform, Python, Autopilot, CONTROL, Linkedin Marketing Solutions, Personio, Microsoft Windows", "keywords": "defense & space manufacturing, modern battlefield, autonomy technology, multi-platform interoperability, rapid deployment systems, disruptive defense tech, surface vehicles, military-grade ai, unmanne", "annualRevenue": null, "totalFunding": 77400000, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": null, "lastRaisedAt": "2026-02-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 4, "firstName": "Pieter", "lastName": "Kroese", "title": "CEO ScreenPoint Medical", "company": "ScreenPoint Medical", "email": "pieter.kroese@screenpointmed.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite", "employees": 75, "industry": "hospital & health care", "website": "https://screenpoint-medical.com", "linkedinPerson": "http://www.linkedin.com/in/pieterkroese", "linkedinCompany": "http://www.linkedin.com/company/screenpoint-medical", "country": "Netherlands", "city": "Amsterdam", "technologies": "Salesforce, Gmail, Google Apps, Microsoft Office 365, Vimeo, Google Tag Manager, Apache, Mobile Friendly, WordPress.org, Hubspot, IoT, Remote, AI, AWS Trusted Advisor, Docker, Kubernetes, C#, Python, Yardi Commercial Suite, Sectra PACS, Microsoft Azure Monitor", "keywords": "medical imaging, decision support, breast cancer, computeraided detection, deep learning, mammography, screening, hospitals & health care, peer-reviewed studies, b2b, ffdm, ai for dense breasts, patie", "annualRevenue": 5500000, "totalFunding": 33280000, "latestFunding": "Series C", "latestFundingAmount": 28000000, "lastRaisedAt": "2021-07-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 5, "firstName": "Ruslan", "lastName": "Rakhimov", "title": "CTO and Founder", "company": "NewOrbit Space", "email": "ruslan@neworbit.space", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite, Engineering & Technical", "employees": 26, "industry": "aviation & aerospace", "website": "https://neworbit.space", "linkedinPerson": "http://www.linkedin.com/in/rakhimovrg", "linkedinCompany": "http://www.linkedin.com/company/neworbit-space", "country": "United Kingdom", "city": "Reading", "technologies": "NSOne, Gmail, Google Apps, Microsoft Office 365, Amazon AWS, Typekit, Squarespace ECommerce, Google Maps, Google Font API, Mobile Friendly, Google Tag Manager, IoT, Micro, Android, Remote, Taleo Applicant Tracking Systems (ATS), Rust, CAT, MUI, OpenTable for Restaurants, ICP, Microsoft Excel, Star, Marketingmatic, Trustwave TrustKeeper, Jira, Amazon FreeRTOS, Bevywise MQTT Broker, C#, CANalyzer, C", "keywords": "aviation & aerospace component manufacturing, precise weather prediction, maritime domain awareness, space launch efficiency, space research, satellite propulsion systems, transportation & logistics, ", "annualRevenue": null, "totalFunding": 7500000, "latestFunding": "Seed", "latestFundingAmount": 7500000, "lastRaisedAt": "2024-03-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 6, "firstName": "Niklas", "lastName": "Brackmann", "title": "Co-Founder", "company": "Prematch", "email": "niklas@prematchapp.de", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite", "employees": 74, "industry": "information technology & services", "website": "https://prematchapp.de", "linkedinPerson": "http://www.linkedin.com/in/niklasbrackmann", "linkedinCompany": "http://www.linkedin.com/company/prematch", "country": "Germany", "city": "", "technologies": "Gmail, Google Apps, Amazon AWS, TikTok, Webflow, SendInBlue, Mobile Friendly, Google Tag Manager, React Native, Android, Remote, Salesforce CRM Analytics, Canva, Figma, Keynote, Google, Microsoft PowerPoint", "keywords": "software development, football community, match news, fixture scheduling, all other amusement and recreation industries, match analysis, mobile applications, local football community, football app, us", "annualRevenue": null, "totalFunding": 4620000, "latestFunding": "Angel", "latestFundingAmount": null, "lastRaisedAt": "2025-04-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 7, "firstName": "Simon", "lastName": "Joecks", "title": "CTO", "company": "Noxtua", "email": "simon.joecks@noxtua.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Engineering & Technical", "employees": 54, "industry": "information technology & services", "website": "https://noxtua.com", "linkedinPerson": "http://www.linkedin.com/in/joecks", "linkedinCompany": "http://www.linkedin.com/company/noxtua", "country": "Germany", "city": "Berlin", "technologies": "Outlook, Microsoft Office 365, Amazon AWS, Slack, Salesforce, Multilingual, Mobile Friendly, reCAPTCHA, React, Javascript, TypeScript, Node.js, Jira, GitHub, GitHub Actions, Confluence, Microsoft 365, Figma, Tailwind, JWT, WP-Oauth, Keycloak, HTML5 Maker, CSS, Salesforce Lightning Web Components, React Native, Rust, Python, Fastapi, PostgreSQL, Oracle XML DB, Apache Parquet, Amazon S3, Langchain, ", "keywords": "technology, information & internet, legal ai training datasets, legal ai for high-security environments, legal ai for legal workflow automation, legal data security, legal ai for legal drafting, legal", "annualRevenue": null, "totalFunding": 104553216, "latestFunding": "Series B", "latestFundingAmount": 92553216, "lastRaisedAt": "2025-04-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 8, "firstName": "Miguel", "lastName": "Aragao", "title": "Head of Engineering", "company": "Opply", "email": "miguel@opply.com", "emailStatus": "Verified", "seniority": "Head", "department": "Engineering & Technical, Information Technology", "employees": 40, "industry": "information technology & services", "website": "https://opply.com", "linkedinPerson": "http://www.linkedin.com/in/mikearagao", "linkedinCompany": "http://www.linkedin.com/company/opply", "country": "United Kingdom", "city": "London", "technologies": "Cloudflare DNS, Gmail, Google Apps, Zendesk, CloudFlare Hosting, Netlify, Hubspot, Slack, WordPress.org, Vimeo, reCAPTCHA, DoubleClick, Linkedin Marketing Solutions, Facebook Widget, DoubleClick Conversion, Google Dynamic Remarketing, Google Tag Manager, Facebook Custom Audiences, YouTube, Facebook Login (Connect), Google Font API, Hotjar, Mobile Friendly, Node.js, React Native, Docker, Xamarin, A", "keywords": "procurement, revenue, ecommerce, supply chain, cost, medium business, software, supply, retail, growth, erp, startup, supply automation, digital, artificial intelligence, small business, consumer good", "annualRevenue": null, "totalFunding": 4000000, "latestFunding": "Seed", "latestFundingAmount": 4000000, "lastRaisedAt": "2022-06-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 9, "firstName": "Tom", "lastName": "Laband", "title": "Co-Founder & CEO", "company": "Adsquare", "email": "tom@adsquare.com", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite", "employees": 120, "industry": "information technology & services", "website": "https://adsquare.com", "linkedinPerson": "http://www.linkedin.com/in/tom-laband-75a08626", "linkedinCompany": "http://www.linkedin.com/company/adsquare-gmbh", "country": "United States", "city": "New York", "technologies": "Cloudflare DNS, Sendgrid, Gmail, Google Apps, MailChimp SPF, Mapbox, Slack, MailChimp, Linkedin Marketing Solutions, Google Tag Manager, Vimeo, Apache, Mobile Friendly, YouTube, WordPress.org, AWS Trusted Advisor, Amazon S3, Apache Iceberg, Apache Parquet, Apache Spark, Athena, AWS Glue Data Catalog, AWS SDK for JavaScript, Hadoop HDFS, Python, Redshift, Scala, Semrush, SQL, Kotlin, Angular, Sprin", "keywords": "mobile programmatic, mobile advertising, mobile audience targeting, audience data, measurement, insights, programmatic advertising, proximity targeting, data exchange, realtime measurement, mobilefirs", "annualRevenue": 13300000, "totalFunding": 9550000, "latestFunding": "Series B", "latestFundingAmount": 3850000, "lastRaisedAt": "2017-02-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 10, "firstName": "Anna", "lastName": "Billgren", "title": "Head of Talent Acquisition", "company": "Flower", "email": "anna.roald.billgren@flower.se", "emailStatus": "Verified", "seniority": "Head", "department": "Human Resources", "employees": 130, "industry": "renewables & environment", "website": "https://flower.se", "linkedinPerson": "http://www.linkedin.com/in/annaroaldbillgren", "linkedinCompany": "http://www.linkedin.com/company/flowertechnologies", "country": "Sweden", "city": "", "technologies": "Route 53, Gmail, Google Apps, Microsoft Office 365, Amazon AWS, Slack, Google Tag Manager, Mobile Friendly, WordPress.org, Linkedin Marketing Solutions, Remote, Databricks, dbt, Python, Airflow, Dagster, Spark, Terraform, AWS CloudFormation, Git, AI, Google Cloud Machine Learning Engine", "keywords": "battery storage, aggregator, sustainable power, electric flexibility, virtual power plant, renewable energy, services for renewable energy, demand response, fossil-free energy transition, local renewa", "annualRevenue": null, "totalFunding": 38190000, "latestFunding": "Series A", "latestFundingAmount": 27500000, "lastRaisedAt": "2024-08-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 11, "firstName": "Tero", "lastName": "Laatikainen", "title": "Principal Consultant, Co-Founder @ Norrin Advisory", "company": "Norrin", "email": "tero.laatikainen@norrin.com", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite, Consulting", "employees": 200, "industry": "information technology & services", "website": "https://norrin.com", "linkedinPerson": "http://www.linkedin.com/in/tero-laatikainen-8891603", "linkedinCompany": "http://www.linkedin.com/company/norrin", "country": "Finland", "city": "Porvoo", "technologies": "Outlook, Microsoft Office 365, Zendesk, Hubspot, CloudFlare, Facebook Widget, Mobile Friendly, Facebook Custom Audiences, Facebook Login (Connect), Google Tag Manager, Multilingual, Typekit, Linkedin Login, Linkedin Marketing Solutions, Google Analytics, Linkedin Widget, Databricks, Microsoft Azure Monitor, Azure Logic Apps, Azure Functions, iManage, Azure Service Bus, Azure Event Hubs, SAP S/4HAN", "keywords": "genai, power platform, data management, integration, data, ai, architecture, architeture, cloud, cloud platform, digital governance, azure, machine learning, power bi, microsoft, it services & it cons", "annualRevenue": 30000000, "totalFunding": null, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 0, "lastRaisedAt": "2022-12-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 12, "firstName": "Ville", "lastName": "Lehmusmies", "title": "Data & Analytics Engineer and People Partner", "company": "Norrin", "email": "ville.lehmusmies@cloud1.fi", "emailStatus": "Verified", "seniority": "Partner", "department": "Engineering & Technical, Information Technology", "employees": 200, "industry": "information technology & services", "website": "https://norrin.com", "linkedinPerson": "http://www.linkedin.com/in/villelehmusmies", "linkedinCompany": "http://www.linkedin.com/company/norrin", "country": "Finland", "city": "", "technologies": "Outlook, Microsoft Office 365, Zendesk, Hubspot, CloudFlare, Facebook Widget, Mobile Friendly, Facebook Custom Audiences, Facebook Login (Connect), Google Tag Manager, Multilingual, Typekit, Linkedin Login, Linkedin Marketing Solutions, Google Analytics, Linkedin Widget, Databricks, Microsoft Azure Monitor, Azure Logic Apps, Azure Functions, iManage, Azure Service Bus, Azure Event Hubs, SAP S/4HAN", "keywords": "genai, power platform, data management, integration, data, ai, architecture, architeture, cloud, cloud platform, digital governance, azure, machine learning, power bi, microsoft, it services & it cons", "annualRevenue": 30000000, "totalFunding": null, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 0, "lastRaisedAt": "2022-12-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 13, "firstName": "Dan", "lastName": "Taylor", "title": "Director of Engineering", "company": "Arenko", "email": "dan.taylor@arenko.group", "emailStatus": "Verified", "seniority": "Director", "department": "Engineering & Technical, Information Technology", "employees": 68, "industry": "renewables & environment", "website": "https://arenko.group", "linkedinPerson": "http://www.linkedin.com/in/danwtaylor", "linkedinCompany": "http://www.linkedin.com/company/arenko-cleantech", "country": "United Kingdom", "city": "", "technologies": "Amazon SES, Gmail, Google Apps, Microsoft Office 365, Zendesk, Atlassian Cloud, Bootstrap Framework, Shutterstock, reCAPTCHA, Google Maps, Google Analytics, WordPress.org, Lucky Orange, Google Font API, Google Maps (Non Paid Users), Mobile Friendly, Google Tag Manager, Nginx, Remote, Amazon S3, Athena, AWS Trusted Advisor, Cassandra, Docker, GitLab, PostgreSQL, Prefect, Pulsar, Python, Terraform, ", "keywords": "services for renewable energy, services, energy storage, deep learning algorithms, asset control, cloud software, grid-scale energy storage, revenue maximization, asset performance monitoring, machine", "annualRevenue": null, "totalFunding": 11880000, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 11880000, "lastRaisedAt": "2025-05-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 14, "firstName": "Grigorios", "lastName": "Kardaras", "title": "Head of Customer Support", "company": "Proximie", "email": "gkardaras@proximie.com", "emailStatus": "Verified", "seniority": "Head", "department": "Engineering & Technical, Operations", "employees": 120, "industry": "hospital & health care", "website": "https://proximie.com", "linkedinPerson": "http://www.linkedin.com/in/grigorios-kardaras-337985115", "linkedinCompany": "http://www.linkedin.com/company/proximie", "country": "United Kingdom", "city": "", "technologies": "Cloudflare DNS, Outlook, Microsoft Office 365, WP Engine, Atlassian Cloud, Webflow, Salesforce, Slack, Linkedin Marketing Solutions, Adobe Media Optimizer, Cedexis Radar, Twitter Advertising, Google Tag Manager, reCAPTCHA, Mobile Friendly, Hubspot, Vimeo, Ruby On Rails, Google Analytics, Remote, AI, Figma, Microsoft Excel, Python, SQL, Intel, Visio, Spark, Presto, Athena, Google AlloyDB for Postgr", "keywords": "augmented reality, medical education, telesurgery, healthcare, technology, telehealth, telecommunications, surgery, hospitals & health care, privacy-preserving data collection, digital health innovati", "annualRevenue": 11000000, "totalFunding": 140000000, "latestFunding": "Series C", "latestFundingAmount": 80000000, "lastRaisedAt": "2022-06-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 15, "firstName": "Melanie", "lastName": "Ross", "title": "Chief Financial Officer", "company": "pubX", "email": "mel@pubx.ai", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Finance", "employees": 25, "industry": "information technology & services", "website": "https://pubx.ai", "linkedinPerson": "http://www.linkedin.com/in/melanie-ross-09237b55", "linkedinCompany": "http://www.linkedin.com/company/pubxai", "country": "United Kingdom", "city": "Sheffield", "technologies": "Route 53, Gmail, Google Apps, Amazon AWS, Squarespace ECommerce, Typekit, Mobile Friendly, Bootstrap Framework, Apache, WordPress.org, Google Tag Manager, Cloudinary, Android, Remote, AI, Python, SQL, Spark, Airflow, dbt, Amazon Managed Streaming for Apache Kafka (Amazon MSK), Amazon Kinesis, Amazon Simple Queue Service (SQS), AWS Analytics, Terraform, CDK, Cursor, Claude", "keywords": "technology, information & internet, ai-powered revenue maximization, cost reduction, services, ad server integration, analytics adapter, computer systems design and related services, publisher monetiz", "annualRevenue": null, "totalFunding": 500000, "latestFunding": "Seed", "latestFundingAmount": null, "lastRaisedAt": "2022-03-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 16, "firstName": "Julien", "lastName": "Merceron", "title": "CFO", "company": "Exotrail", "email": "julien.merceron@exotrail.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Finance", "employees": 200, "industry": "defense & space", "website": "https://exotrail.com", "linkedinPerson": "http://www.linkedin.com/in/julien-merceron-6030306", "linkedinCompany": "http://www.linkedin.com/company/exotrail", "country": "France", "city": "Paris", "technologies": "Cloudflare DNS, Outlook, Webflow, Slack, Mobile Friendly, Google Tag Manager, Ruby On Rails, Dassault SOLIDWORKS, CATIA, SAM, WP-Oauth, Cisco Secure Firewall Management Center, AdPilot, Blue Coat ProxySG, Cisco VPN, Zscaler ZTNA, AWS SDK for JavaScript, Python, TypeScript, Node.js, Nestjs, VueJS, React, Docker, Kubernetes, GitLab, Jenkins, Sinda, CANalyzer, Fastapi, ClickHouse, PostgreSQL, pandas,", "keywords": "propulsion, mobility operator, space mechanics, software, orbital transfer vehicle, in orbit services, new space, fds, small satellite, satellite, defense & space manufacturing, spacecraft end-of-life", "annualRevenue": 7500000, "totalFunding": 74429999, "latestFunding": "Series B", "latestFundingAmount": 58000000, "lastRaisedAt": "2023-02-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 17, "firstName": "Phil", "lastName": "O'Hagan", "title": "VP Operations at Maze", "company": "Maze", "email": "phil@mazehq.com", "emailStatus": "Verified", "seniority": "Vp", "department": "Operations", "employees": 32, "industry": "computer & network security", "website": "https://mazehq.com", "linkedinPerson": "http://www.linkedin.com/in/philohagan1", "linkedinCompany": "http://www.linkedin.com/company/mazehq", "country": "United Kingdom", "city": "London", "technologies": "Route 53, Gmail, Google Apps, Slack, Google Tag Manager, Mobile Friendly, Apache, AWS Trusted Advisor, Terraform, React, TypeScript, Tailwind, Route, Python, Fastapi, Glassdoor, Linkedin Marketing Solutions, ANGEL LMS, Amazon EC2, Docker, go+, CallMiner Eureka, AI, Amazon S3, Apache Iceberg, Apache Kafka, Semrush, Spark, WorkFusion AI Digital Agents, Kubernetes, Flux, HELM, Prometheus, Grafana, Hu", "keywords": "security automation, security workflow orchestration, security incident response, ai-powered security, security incident automation, automated security decision-making, cloud security ai workflows, ai", "annualRevenue": null, "totalFunding": 31000000, "latestFunding": "Series A", "latestFundingAmount": 25000000, "lastRaisedAt": "2025-06-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 18, "firstName": "Eman", "lastName": "Tadayyon", "title": "Director of Global Freight and Logistics", "company": "Augustinus Bader", "email": "eman.tadayyon@augustinusbader.com", "emailStatus": "Verified", "seniority": "Director", "department": "Operations", "employees": 200, "industry": "cosmetics", "website": "https://augustinusbader.com", "linkedinPerson": "http://www.linkedin.com/in/eman-tadayyon-49a919146", "linkedinCompany": "http://www.linkedin.com/company/augustinus-bader", "country": "United Kingdom", "city": "London", "technologies": "Route 53, Gmail, Outlook, Google Apps, Helpscout, Amazon AWS, UPS, Magento 2 Enterprise, Magento Enterprise, Slack, Adobe Marketing Cloud, AB Tasty, Hotjar, Facebook Login (Connect), Nginx, Mobile Friendly, reCAPTCHA, Facebook Widget, The Trade Desk, YouTube, Facebook Custom Audiences, Amadesa, Braintree, Multilingual, Vimeo, Wistia, Yotpo, Apple Pay, Bing Ads, WordPress.org, Google Font API, Adob", "keywords": "high-end skincare, skin rejuvenation treatments, hydrating serum, scientific research, skin regeneration, d2c, skin rejuvenation, anti-wrinkle cream, cell renewal complex, cosmetic science, skin healt", "annualRevenue": 130000000, "totalFunding": 25000000, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 25000000, "lastRaisedAt": "2022-11-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 19, "firstName": "Rajiv", "lastName": "Tanna", "title": "Cofounder", "company": "Birdie", "email": "rajiv.tanna@birdie.care", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite", "employees": 170, "industry": "hospital & health care", "website": "https://birdie.care", "linkedinPerson": "http://www.linkedin.com/in/rajivtanna", "linkedinCompany": "http://www.linkedin.com/company/birdiecare", "country": "United Kingdom", "city": "London", "technologies": "Cloudflare DNS, Sendgrid, Gmail, Google Apps, MailChimp SPF, Microsoft Office 365, React, Webflow, Chargebee, Hubspot, Hotjar, Cedexis Radar, Eventbrite, Trustpilot, Bootstrap Framework, Facebook Login (Connect), YouTube, DoubleClick, Visual Website Optimizer, Adobe Media Optimizer, Google Tag Manager, Linkedin Marketing Solutions, Vimeo, Content.ad, DoubleClick Conversion, Intercom, Bing Ads, Fac", "keywords": "inhome care, technology, health tech, senior care, care, healthcare, home care, iot, digitalhealth, hospitals & health care, b2b, payroll systems, care safety protocols, care safety, care workforce ma", "annualRevenue": 13000000, "totalFunding": 54950000, "latestFunding": "Series B", "latestFundingAmount": 33000000, "lastRaisedAt": "2022-06-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 20, "firstName": "Michael", "lastName": "Foertsch", "title": "CEO", "company": "Q.ANT", "email": "michael.foertsch@qant.gmbh", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite", "employees": 78, "industry": "electrical/electronic manufacturing", "website": "https://qant.com", "linkedinPerson": "http://www.linkedin.com/in/michaelfoertsch", "linkedinCompany": "http://www.linkedin.com/company/qant", "country": "Germany", "city": "Stuttgart", "technologies": "Outlook, Microsoft Office 365, Slack, Google Tag Manager, Apache, Mobile Friendly, WordPress.org, Python, C#, Rust, Jupyter, Analyzer, LabVIEW, MATLAB, Photon, Visual-Basic-.NET", "keywords": "lightsources, quantum, quantum photonic computing, laser, photonics, energyefficient ai & hpc, analog photonic comuting, quantum technology, next level of compute for ai & hpc, quantumsensing, photoni", "annualRevenue": null, "totalFunding": 144047100, "latestFunding": "Series A", "latestFundingAmount": 72047100, "lastRaisedAt": "2025-07-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 21, "firstName": "Pim", "lastName": "Elshoff", "title": "Director of Software Engineering", "company": "Superscript", "email": "pim.elshoff@gosuperscript.com", "emailStatus": "Verified", "seniority": "Director", "department": "Engineering & Technical, Information Technology", "employees": 120, "industry": "insurance", "website": "https://gosuperscript.com", "linkedinPerson": "http://www.linkedin.com/in/pim-elshoff-184a8755", "linkedinCompany": "http://www.linkedin.com/company/superscript-insurance", "country": "Netherlands", "city": "Veenendaal", "technologies": "NSOne, Gmail, Google Apps, Microsoft Office 365, Zendesk, Amazon AWS, Route 53, Google Cloud Hosting, VueJS, Netlify, The Trade Desk, Slack, Hubspot, Cloudinary, Vimeo, Segment.io, Google Analytics, YouTube, FullStory, reCAPTCHA, Adobe Media Optimizer, Google Tag Manager, Ruby On Rails, Trustpilot, Cedexis Radar, Bootstrap Framework, Mobile Friendly, Remote, AI, Mint, Microsoft Excel, Python, SQL,", "keywords": "business insurance, cyber insurance, insurance for startups, professional indemnity insurance, directors & officers insurance, insurance for software & app development, psd2, insurance for blockchain,", "annualRevenue": 54760000, "totalFunding": 93649320, "latestFunding": "Series B", "latestFundingAmount": 59400000, "lastRaisedAt": "2023-01-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 22, "firstName": "Pierre", "lastName": "Pennec", "title": "Head of Sales Performance", "company": "leakmited", "email": "pierre.le-pennec@leakmited.com", "emailStatus": "Verified", "seniority": "Head", "department": "Human Resources, Sales", "employees": 50, "industry": "renewables & environment", "website": "https://leakmited.com", "linkedinPerson": "http://www.linkedin.com/in/pierrelepennec", "linkedinCompany": "http://www.linkedin.com/company/leakmited", "country": "France", "city": "Paris", "technologies": "Cloudflare DNS, Route 53, Gmail, Google Apps, Microsoft Office 365, Webflow, Slack, Amazon SES, Mobile Friendly, Google Tag Manager, Vimeo, Android, Docker, IoT, Node.js, Micro, AI, Canal", "keywords": "logiciel gestion reseau deau, air, water, & waste program management, diagnostic de r\u00c3\u00a9seaux fragment\u00c3\u00a9s, business intelligence, outil de priorisation des interventions, performance des r\u00c3\u00a9seaux d'eau", "annualRevenue": null, "totalFunding": 6600000, "latestFunding": "Series A", "latestFundingAmount": 5500000, "lastRaisedAt": "2025-01-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 23, "firstName": "Frank", "lastName": "Birzle", "title": "Co-Founder & Managing Director", "company": "Klar", "email": "frank@getklar.com", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite", "employees": 53, "industry": "information technology & services", "website": "https://getklar.com", "linkedinPerson": "http://www.linkedin.com/in/frankbirzle", "linkedinCompany": "http://www.linkedin.com/company/getklar", "country": "Germany", "city": "Munich", "technologies": "Cloudflare DNS, Sendgrid, Gmail, Google Apps, Microsoft Office 365, CloudFlare Hosting, Typeform, Slack, YouTube, Mobile Friendly, Google Tag Manager, Remote, AI, Prefect, ClickHouse, Python, SQL, Terraform, Kubernetes, HELM, GitHub Actions, Flux, go+, Rust, Azure Linux Virtual Machines, Metabase, Linkedin Marketing Solutions, Google, Meta Ads Manager, Pinterest, Shopify, Snapchat, TikTok", "keywords": "software development, data integration api, cost management, profitability dashboard, marketing attribution, ecommerce analytics, unbundling product bundles, cost attribution, automated cost calculati", "annualRevenue": 2000000, "totalFunding": 2750000, "latestFunding": "Seed", "latestFundingAmount": 2750000, "lastRaisedAt": "2022-03-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 24, "firstName": "Dino", "lastName": "Delic", "title": "Chief Operating Officer (Partner)", "company": "FishingBooker", "email": "dino.delic@fishingbooker.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Information Technology, Operations", "employees": 190, "industry": "information technology & services", "website": "https://fishingbooker.com", "linkedinPerson": "http://www.linkedin.com/in/delicdino", "linkedinCompany": "http://www.linkedin.com/company/fishingbooker", "country": "United States", "city": "Norfolk", "technologies": "Cloudflare DNS, Gmail, Google Apps, CloudFlare Hosting, CloudFlare, OneTrust, Figma, Slack, Spreadsheet Server by insightsoftware, Inventor, TSYS, Bing Ads, Google Ads, Meta Ads, Expo, Firebase, React Native, Redux, , TypeScript, Adobe Creative Cloud, Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop, , Playwright, Appium, Pytest, GitHub, Basecamp, Stripe, Zendesk, Zapier, SQL, Airflow, Ama", "keywords": "startup industry, booking industry, fishing industry, travel industry, travel, adventure travel, outdoors, online reservations, technology, information & internet, leisure, travel & tourism, informati", "annualRevenue": 310000, "totalFunding": 60000, "latestFunding": "Seed", "latestFundingAmount": 60000, "lastRaisedAt": "2014-02-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 25, "firstName": "Apeksha", "lastName": "Mathur", "title": "Talent Acquisition Partner", "company": "Apaleo", "email": "apeksha.mathur@apaleo.com", "emailStatus": "Verified", "seniority": "Partner", "department": "Human Resources", "employees": 85, "industry": "information technology & services", "website": "https://apaleo.com", "linkedinPerson": "http://www.linkedin.com/in/apeksha-m-a0412a112", "linkedinCompany": "http://www.linkedin.com/company/apaleo", "country": "Germany", "city": "Munich", "technologies": "Route 53, Rackspace MailGun, Outlook, Zendesk, Amazon AWS, Gmail, Google Apps, VueJS, WP Engine, React, GitHub Hosting, Chargebee, Hubspot, Slack, Google Font API, Google Analytics, WordPress.org, Ruby On Rails, Linkedin Marketing Solutions, Vimeo, Nginx, Facebook Widget, Segment.io, Stripe, Pingdom, Facebook Login (Connect), Hotjar, Greenhouse.io, Hotel Spider, YouTube, Mobile Friendly, Google Ta", "keywords": "property management software, central reservation system, application store, open api, hospitality technology, hospitality software, hotels, hotel pms, cloud pms, hotel software, pms, platform, agenti", "annualRevenue": 8000000, "totalFunding": 31900000, "latestFunding": "Series B", "latestFundingAmount": 22000000, "lastRaisedAt": "2024-11-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 26, "firstName": "Julien", "lastName": "Mosse", "title": "Chief Revenue Officer (CRO)", "company": "Refinery89", "email": "julien.mosse@refinery89.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Sales", "employees": 69, "industry": "marketing & advertising", "website": "https://refinery89.com", "linkedinPerson": "http://www.linkedin.com/in/julienmosse", "linkedinCompany": "http://www.linkedin.com/company/refinery89", "country": "France", "city": "", "technologies": "Amazon CloudFront, Amazon SES, Gmail, Outlook, Amazon Elastic Load Balancer, Google Apps, Microsoft Office 365, Amazon AWS, Atlassian Cloud, Slack, Active Campaign, Facebook Custom Audiences, YouTube, Linkedin Marketing Solutions, DoubleClick Conversion, Mobile Friendly, Google Tag Manager, DoubleClick, WordPress.org, Bootstrap Framework, Facebook Login (Connect), Google Analytics, Google AdSense,", "keywords": "rtb, entertainment, movies, programmatic advertising, sales, technology, series, publishing, online ads, campaigns, appnexus, prebid, publishers, online advertising, iab, adtech, online media, monetiz", "annualRevenue": null, "totalFunding": null, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 0, "lastRaisedAt": "2025-04-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 27, "firstName": "Shafiek", "lastName": "Johnson", "title": "Head of Information Security & ITSM", "company": "Adsquare", "email": "shafiek@adsquare.com", "emailStatus": "Verified", "seniority": "Head", "department": "Information Technology", "employees": 120, "industry": "information technology & services", "website": "https://adsquare.com", "linkedinPerson": "http://www.linkedin.com/in/shafiek-johnson-6a602862", "linkedinCompany": "http://www.linkedin.com/company/adsquare-gmbh", "country": "Germany", "city": "Berlin", "technologies": "Cloudflare DNS, Sendgrid, Gmail, Google Apps, MailChimp SPF, Mapbox, Slack, MailChimp, Linkedin Marketing Solutions, Google Tag Manager, Vimeo, Apache, Mobile Friendly, YouTube, WordPress.org, AWS Trusted Advisor, Amazon S3, Apache Iceberg, Apache Parquet, Apache Spark, Athena, AWS Glue Data Catalog, AWS SDK for JavaScript, Hadoop HDFS, Python, Redshift, Scala, Semrush, SQL, Kotlin, Angular, Sprin", "keywords": "mobile programmatic, mobile advertising, mobile audience targeting, audience data, measurement, insights, programmatic advertising, proximity targeting, data exchange, realtime measurement, mobilefirs", "annualRevenue": 13300000, "totalFunding": 9550000, "latestFunding": "Series B", "latestFundingAmount": 3850000, "lastRaisedAt": "2017-02-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 28, "firstName": "Timo", "lastName": "Horstschaefer", "title": "CTO & Co-founder", "company": "Ledgy", "email": "timo@ledgy.com", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite, Engineering & Technical", "employees": 70, "industry": "financial services", "website": "https://ledgy.com", "linkedinPerson": "http://www.linkedin.com/in/timohorstschaefer", "linkedinCompany": "http://www.linkedin.com/company/ledgy", "country": "Switzerland", "city": "Zuerich", "technologies": "Cloudflare DNS, Gmail, Google Apps, Microsoft Office 365, Netlify, React, Webflow, Hubspot, Slack, Amadesa, DoubleClick, Google Font API, WordPress.org, Bing Ads, DoubleClick Conversion, Google Tag Manager, Linkedin Marketing Solutions, Facebook Custom Audiences, Visual Website Optimizer, Vimeo, Braintree, Mobile Friendly, Twitter Advertising, Facebook Login (Connect), Stripe, Adobe Media Optimize", "keywords": "saas, esop, psop, due diligence, cap table, document templating, investor relations, equity management, startups, startup, exit modeling, reporting, portfolio, round modeling, share register, portfoli", "annualRevenue": 2000000, "totalFunding": 35300000, "latestFunding": "Series B", "latestFundingAmount": 24200000, "lastRaisedAt": "2022-09-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 29, "firstName": "Marko", "lastName": "Budiselic", "title": "Chief Technology Officer", "company": "Memgraph", "email": "marko.budiselic@memgraph.io", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Engineering & Technical", "employees": 57, "industry": "information technology & services", "website": "https://memgraph.com", "linkedinPerson": "http://www.linkedin.com/in/markobudiselic", "linkedinCompany": "http://www.linkedin.com/company/memgraph", "country": "Croatia", "city": "", "technologies": "Cloudflare DNS, Gmail, Google Apps, MailChimp SPF, CloudFlare Hosting, Microsoft Office 365, Pipedrive, Leadfeeder, Mapbox, Slack, DoubleClick Conversion, Mobile Friendly, Facebook Custom Audiences, Active Campaign, reCAPTCHA, Google Font API, Linkedin Marketing Solutions, Facebook Widget, Vimeo, Facebook Login (Connect), Google Dynamic Remarketing, Google Tag Manager, DoubleClick, Segment.io, Dat", "keywords": "realtime analytics, speed, realtime transactions, scale, graph databases, security, inmemory, database software, kafka, streaming, concurrency, databases, opencypher, smartfastdata, big data, enterpri", "annualRevenue": 2220000, "totalFunding": 20890590, "latestFunding": "Seed", "latestFundingAmount": 2640000, "lastRaisedAt": "2023-12-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 30, "firstName": "Esther", "lastName": "Pool-Kamp", "title": "Cfo/coo", "company": "Marie-Stella-Maris (B Corp)", "email": "e.poolkamp@marie-stella-maris.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Finance, Information Technology, Operations", "employees": 170, "industry": "health, wellness & fitness", "website": "https://marie-stella-maris.com", "linkedinPerson": "http://www.linkedin.com/in/esther-pool-kamp-71aab999", "linkedinCompany": "http://www.linkedin.com/company/marie-stella-maris", "country": "Netherlands", "city": "Amsterdam", "technologies": "Salesforce, Mailchimp Mandrill, Outlook, Microsoft Office 365, JQuery 2.1.1, WP Engine, Figma, Shopify Plus, Slack, Klaviyo, Google Tag Manager, Visual Website Optimizer, Hotjar, Lucky Orange, TripleLift, reCAPTCHA, Facebook Login (Connect), AppNexus, Yotpo, Shopify, Google Dynamic Remarketing, AB Tasty, Rubicon Project, WordPress.org, Facebook Custom Audiences, Amadesa, Bing Ads, DoubleClick, Fac", "keywords": "body care, hygiene solutions, mineral water, refill solutions, hotel essentials, hotel amenities, home fragrances, retail health & personal care products, vegan skincare, sustainable beauty, sporting ", "annualRevenue": 7500000, "totalFunding": 3300000, "latestFunding": "Seed", "latestFundingAmount": 3300000, "lastRaisedAt": "2020-12-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 31, "firstName": "David", "lastName": "Ross", "title": "Senior Quantitative Developer (Director)", "company": "TradingHub", "email": "david.ross@tradinghub.com", "emailStatus": "Verified", "seniority": "Director", "department": "Engineering & Technical, Information Technology", "employees": 150, "industry": "information technology & services", "website": "https://tradinghub.com", "linkedinPerson": "http://www.linkedin.com/in/david-ross-8849221", "linkedinCompany": "http://www.linkedin.com/company/tradinghub", "country": "United Kingdom", "city": "London", "technologies": "Route 53, Amazon SES, Outlook, CloudFlare Hosting, Slack, Mobile Friendly, Hubspot, Remote, Siemens SIMATIC S7, Kotlin, C#, Microsoft PowerShell, Jira, Confluence, Bitbucket, SonarQube, JFrog Artifactory, AWS CloudFormation, Terraform, AWS Trusted Advisor, Amazon EC2, Amazon S3, ECS, Avaya UCaaS", "keywords": "market abuse detection, best execution analysis, antimoney laundering, trade surveillance, analytics, reporting, software development, market surveillance technology, market impact modeling, market ri", "annualRevenue": 39000000, "totalFunding": null, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 0, "lastRaisedAt": "2023-06-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 32, "firstName": "Mark", "lastName": "Yudin", "title": "VP of Engineering", "company": "Insify", "email": "mark.yudin@insify.nl", "emailStatus": "Verified", "seniority": "Vp", "department": "Engineering & Technical, Information Technology", "employees": 74, "industry": "insurance", "website": "https://insify.nl", "linkedinPerson": "http://www.linkedin.com/in/mark-yudin-0a3b564b", "linkedinCompany": "http://www.linkedin.com/company/insify", "country": "Netherlands", "city": "Amsterdam", "technologies": "Route 53, Gmail, Google Apps, Amazon AWS, VueJS, Chargebee, Lever, Linkedin Marketing Solutions, Twitter Advertising, DoubleClick Conversion, Adobe Media Optimizer, Cedexis Radar, Hotjar, Mobile Friendly, Facebook Login (Connect), Trustpilot, Bing Ads, Bootstrap Framework, DoubleClick, YouTube, Google Dynamic Remarketing, Google Tag Manager, Facebook Widget, Vimeo, Facebook Custom Audiences, Remot", "keywords": "business insurance, digital insurance, insurtech, insurance innovation, insurance, entrepreneurship, commercial insurance, business, online policy management, digital insurance solutions, occupational", "annualRevenue": 2000000, "totalFunding": 45540000, "latestFunding": "Series B", "latestFundingAmount": 17930000, "lastRaisedAt": "2025-09-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 33, "firstName": "Cedric", "lastName": "Huyghebaert", "title": "Chief Technology Officer", "company": "Black Semiconductor", "email": "cedric.huyghebaert@blacksemi.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Engineering & Technical", "employees": 120, "industry": "semiconductors", "website": "https://blacksemi.com", "linkedinPerson": "http://www.linkedin.com/in/cedrichuyghebaert", "linkedinCompany": "http://www.linkedin.com/company/black-semiconductor", "country": "Belgium", "city": "Leuven", "technologies": "Outlook, Microsoft Office 365, Slack, Apache, WordPress.org, Mobile Friendly, Elite Software HVAC Solution, OpenText GroupWise, Vormetric Data Security Platform, Tor, Photon, SES, Air, Atera, Olo, RabbitMQ, Apache Kafka, REST, Oracle XML DB, Spark, Cisco Unified Intelligence Center, Airflow, ClickHouse, Kubernetes, Red Hat OpenShift, Microsoft Azure Monitor, AWS Trusted Advisor, Google Cloud Platf", "keywords": "photonics, graphene, photonic on electronics integration, semiconductor, photonics & photonic on electronics integration, semiconductor manufacturing, energy-saving data transfer, high-performance com", "annualRevenue": null, "totalFunding": 35860000, "latestFunding": "Series A", "latestFundingAmount": 28270000, "lastRaisedAt": "2024-06-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 34, "firstName": "Ramute", "lastName": "Varnelyte", "title": "Chief Executive Officer", "company": "IPXO", "email": "ramute@ipxo.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite", "employees": 80, "industry": "information technology & services", "website": "https://ipxo.com", "linkedinPerson": "http://www.linkedin.com/in/ramut%c4%97-varnelyt%c4%97-982910b2", "linkedinCompany": "http://www.linkedin.com/company/ipxo", "country": "Lithuania", "city": "Vilnius", "technologies": "Cloudflare DNS, Outlook, Microsoft Office 365, CloudFlare Hosting, Leadfeeder, React, MongoDB, Freshdesk, Slack, PHP, Laravel, go+, CyberArk Privileged Access Manager, Xero, Microsoft 365, Microsoft Exchange Online, Microsoft Entra, SharePoint, Microsoft OneDrive for Business, Microsoft Teams, Microsoft Intune, Microsoft PowerShell, Python, Bash, Google Ads, Bing, LinkedIn Ads, Google Analytics 4 ", "keywords": "ip address, ip management, networking, ipv4, information technology, ipv4 leasing, ipv4 monetizing, it services & it consulting, ip address industry collaboration, bgp routing, ip address automation, ", "annualRevenue": null, "totalFunding": 3560000, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 0, "lastRaisedAt": "2025-10-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 35, "firstName": "Philipp", "lastName": "Poetzl", "title": "Co-Founder / CTO / Managing Director", "company": "QPLIX GmbH", "email": "philipp.poetzl@qplix.com", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite, Engineering & Technical", "employees": 150, "industry": "information technology & services", "website": "https://qplix.com", "linkedinPerson": "http://www.linkedin.com/in/philipp-poetzl", "linkedinCompany": "http://www.linkedin.com/company/qplix", "country": "Germany", "city": "Munich", "technologies": "Cloudflare DNS, Outlook, Microsoft Office 365, SparkPost, Slack, Hubspot, Zendesk, DoubleClick Conversion, Google Tag Manager, Mobile Friendly, YouTube, Bing Ads, DoubleClick, Google Dynamic Remarketing, Google Maps, Linkedin Marketing Solutions, Remote, Python, Salesforce CRM Analytics, Drawbridge, Figma, Zoom Whiteboard", "keywords": "saas software, wealth management software, vermoegensverwaltung software, family office software, private banking, wealthtech, software development, portfolio management, accounting integration, workf", "annualRevenue": 5000000, "totalFunding": 27500000, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 27500000, "lastRaisedAt": "2024-11-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 36, "firstName": "Andrew", "lastName": "Birch", "title": "Chief Sales Officer (CSO)", "company": "Dayshape", "email": "andrew.birch@dayshape.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Sales", "employees": 150, "industry": "information technology & services", "website": "https://dayshape.com", "linkedinPerson": "http://www.linkedin.com/in/andrewkbirch", "linkedinCompany": "http://www.linkedin.com/company/dayshape", "country": "United Kingdom", "city": "Oxford", "technologies": "Cloudflare DNS, Outlook, Zendesk, Microsoft Office 365, Oracle Cloud, A2 Hosting DNS, Figma, Freshdesk, Hubspot, Slack, Linkedin Widget, Mobile Friendly, Hotjar, Facebook Login (Connect), Google Tag Manager, Facebook Widget, Linkedin Login, AI, Remote, DotNetNuke, VueJS, .NET, Azure SQL, Microsoft Azure Monitor, Javascript, CSS, HTML Pro, LinkedIn Recruiter, CallMiner Eureka, Perkville", "keywords": "intelligent automation, resource planning, pm, professional services, wfm, resource scheduling, workforce optimisation, autonmous planning, automated scheduling, employee satisfaction, ai, psa, worklo", "annualRevenue": 13700000, "totalFunding": null, "latestFunding": "Seed", "latestFundingAmount": null, "lastRaisedAt": "2014-06-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 37, "firstName": "Jean-Charles", "lastName": "Faugere", "title": "Chief Technology Officer", "company": "CryptoNext Security", "email": "jean-charles.faugere@cryptonext-security.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Engineering & Technical", "employees": 29, "industry": "computer & network security", "website": "https://cryptonext-security.com", "linkedinPerson": "http://www.linkedin.com/in/jean-charles-faugere-70b5a3166", "linkedinCompany": "http://www.linkedin.com/company/cryptonext-security", "country": "France", "city": "Paris", "technologies": "Outlook, GitHub Hosting, Webflow, Workable, Slack, Mobile Friendly, GoToWebinar, Apache, reCAPTCHA, WordPress.org, Hubspot, Google Tag Manager, Viewpoint, AI, DPDK (Data Plane Development Kit), Apache Kafka, Azure Linux Virtual Machines, Node.js, React, Docker, Kubernetes, Elasticsearch, Logstash, Kibana, PostgreSQL, .GIS", "keywords": "pqc, cryptoagility, postquantum, cryptography", "annualRevenue": null, "totalFunding": 12100000, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 12100000, "lastRaisedAt": "2023-11-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 38, "firstName": "Johan", "lastName": "Segerstedt", "title": "CIO", "company": "Avida Finans AB", "email": "johan.segerstedt@avida.se", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Information Technology", "employees": 130, "industry": "financial services", "website": "https://avidafinance.com", "linkedinPerson": "http://www.linkedin.com/in/johan-segerstedt-5834261", "linkedinCompany": "http://www.linkedin.com/company/avida-finans-ab", "country": "Sweden", "city": "Stockholm", "technologies": "Route 53, Rackspace MailGun, Outlook, Microsoft Office 365, Amazon AWS, Grafana, Zendesk, Slack, dbt, Matillion, SQL, Snowflake", "keywords": "fakturabelaning, konsument, lan, produktutveckling, privateequity, foeretagsfinansiering, itutveckling, finansiella loesningar, laneansoekan, krediter", "annualRevenue": 68000000, "totalFunding": null, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": null, "lastRaisedAt": "2020-02-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 39, "firstName": "Nik", "lastName": "Holgate", "title": "Chief Financial Officer", "company": "Person Centred Software Ltd", "email": "n.holgate@personcentredsoftware.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Finance", "employees": 93, "industry": "information technology & services", "website": "https://personcentredsoftware.com", "linkedinPerson": "http://www.linkedin.com/in/nikholgate", "linkedinCompany": "http://www.linkedin.com/company/person-centred-software", "country": "United Kingdom", "city": "London", "technologies": "Cloudflare DNS, Rackspace MailGun, Outlook, Microsoft Office 365, Zendesk, CloudFlare Hosting, Media Temple SSL, Atlassian Cloud, React, Hubspot, Slack, Bing Ads, Adobe Media Optimizer, Linkedin Login, Google Dynamic Remarketing, DoubleClick Conversion, Linkedin Widget, Hotjar, Bootstrap Framework, Facebook Widget, Shutterstock, Linkedin Marketing Solutions, Vimeo, Cedexis Radar, Facebook Login (C", "keywords": "assistive technology, care home software, technology for care homes, evidence of care, mobile healthcare, social care software, health care software, mobile technology, software development, care sect", "annualRevenue": 21000000, "totalFunding": null, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 0, "lastRaisedAt": "2025-12-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 40, "firstName": "Toygun", "lastName": "Onaran", "title": "Chief Financial Officer", "company": "Massive Bio", "email": "tonaran@massivebio.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Finance", "employees": 140, "industry": "hospital & health care", "website": "https://massivebio.com", "linkedinPerson": "http://www.linkedin.com/in/toygun-onaran-9a90b36", "linkedinCompany": "http://www.linkedin.com/company/massivebio", "country": "United States", "city": "Boca Raton", "technologies": "Cloudflare DNS, Outlook, Quickbooks Online, CloudFlare Hosting, Microsoft Azure Hosting, Amazon AWS, Microsoft Azure, TikTok, Hubspot, Slack, Google Tag Manager, Google Play, reCAPTCHA, Vimeo, WordPress.org, Google Font API, YouTube, Mobile Friendly, AI, Salesforce CRM Analytics, Gusto, Deel, .NET, RevenueWell (patientconnect365), OnCore CTMS, SYNERGY, Duo, WebOffice, Wordpress, PHP, Javascript, L", "keywords": "targeted cancer therapies, cancer genomics, tumor profiling technologies, clinical trial selection, second opinion, cancer treatment, precision oncology, personalized cancer treatment options, oncolog", "annualRevenue": 37300000, "totalFunding": 29600000, "latestFunding": "Series B", "latestFundingAmount": 16500000, "lastRaisedAt": "2022-12-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 41, "firstName": "Yaron", "lastName": "Hershcovich", "title": "Chief Technology Officer", "company": "BridgerPay", "email": "yaron@bridgerpay.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Engineering & Technical", "employees": 59, "industry": "information technology & services", "website": "https://bridgerpay.com", "linkedinPerson": "http://www.linkedin.com/in/yaron-hershcovich-1782461b2", "linkedinCompany": "http://www.linkedin.com/company/bridgerpay", "country": "Cyprus", "city": "Limassol", "technologies": "Salesforce, Cloudflare DNS, Postmark, ExactTarget, Gmail, Pardot, Google Apps, Microsoft Office 365, CloudFlare Hosting, CloudFlare, Atlassian Cloud, Zoho CRM, Slack, Active Campaign, Linkedin Marketing Solutions, YouTube, Mobile Friendly, World Pay, Intercom, Remote, AI, SQL, Python, Google Cloud Platform, Google Cloud BigQuery, C#, Microsoft.NET Core 3.1, Microsoft SQL Server Reporting Services,", "keywords": "cross border payments, fintech, payment methods, merchant services, b2b, bridger retry, payments ai, payments, payments solutions, payment services, saas, paytech, payment orchestration, payments tech", "annualRevenue": null, "totalFunding": 10000000, "latestFunding": "Seed", "latestFundingAmount": 6000000, "lastRaisedAt": "2022-05-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 42, "firstName": "Diana", "lastName": "Lopez", "title": "Head of People & Culture \u00e2\u009d\u00a4\u00ef\u00b8\u008f", "company": "Goodstack", "email": "diana@goodstack.io", "emailStatus": "Verified", "seniority": "Head", "department": "Human Resources", "employees": 110, "industry": "information technology & services", "website": "https://goodstack.io", "linkedinPerson": "http://www.linkedin.com/in/dianacatherinelo", "linkedinCompany": "http://www.linkedin.com/company/goodstackglobal", "country": "United Kingdom", "city": "London", "technologies": "Route 53, Amazon SES, Sendgrid, Gmail, Google Apps, Microsoft Office 365, Zendesk, Salesforce, Amazon AWS, Cloudflare DNS, CloudFlare Hosting, Hubspot, Slack, Active Campaign, Vercel, Typeform, Create React App, Trustpilot, Mobile Friendly, Bootstrap Framework, Google Tag Manager, Segment.io, DoubleClick Conversion, DoubleClick, Google Dynamic Remarketing, Remote, AI, dbt, Snowflake, Metabase, AWS", "keywords": "nonprofits, saas, fintech, b2b, enterprise software, volunteering management, online giving, grants management, charity vetting, due diligence, charity verifications, donation management, employee eng", "annualRevenue": 17300000, "totalFunding": 63580000, "latestFunding": "Series A", "latestFundingAmount": 29280000, "lastRaisedAt": "2024-11-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 43, "firstName": "Tim", "lastName": "Knowles", "title": "Chief Revenue Officer", "company": "Semble", "email": "tim@semble.io", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Sales", "employees": 140, "industry": "information technology & services", "website": "https://semble.io", "linkedinPerson": "http://www.linkedin.com/in/timknowles", "linkedinCompany": "http://www.linkedin.com/company/semble-health", "country": "United Kingdom", "city": "London", "technologies": "Route 53, Outlook, Microsoft Office 365, CloudFlare Hosting, Amazon AWS, React, MongoDB, Hubspot, Typekit, Google Tag Manager, Stripe, Facebook Widget, Linkedin Login, Linkedin Widget, DoubleClick, Intercom, Mobile Friendly, Facebook Custom Audiences, Hotjar, DoubleClick Conversion, Google Dynamic Remarketing, Vimeo, Google AdWords Conversion, Cedexis Radar, Adobe Media Optimizer, Google Analytics", "keywords": "clinical systems, video consultation, software, cloud based, eprescriptions, saas, healthcare technology, software development, multi-specialty support, patient portal, automated reminders, security, ", "annualRevenue": 15700000, "totalFunding": 27500000, "latestFunding": "Series B", "latestFundingAmount": 15000000, "lastRaisedAt": "2024-10-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 44, "firstName": "Claire", "lastName": "Connor", "title": "Chief Revenue Officer", "company": "PhantomBuster", "email": "claire.connor@thephantomcompany.com", "emailStatus": "Verified", "seniority": "C suite", "department": "C-Suite, Sales", "employees": 75, "industry": "information technology & services", "website": "https://phantombuster.com", "linkedinPerson": "http://www.linkedin.com/in/claireconnor", "linkedinCompany": "http://www.linkedin.com/company/officialphantombuster", "country": "France", "city": "Paris", "technologies": "Route 53, Mailchimp Mandrill, SendInBlue, Gmail, Google Apps, MailChimp SPF, Microsoft Office 365, Zendesk, Amazon AWS, Google Cloud Hosting, Segment.io, Mixpanel, CloudFlare, Netlify, Typeform, Webflow, Slack, Hotjar, Yelp, Facebook Custom Audiences, Ruby On Rails, Mobile Friendly, Cedexis Radar, Facebook Login (Connect), Vimeo, reCAPTCHA, Hubspot, Bootstrap Framework, Adobe Media Optimizer, YouT", "keywords": "lead generation, b2b sales, sales intelligence software & lead generation, growth marketing, marketplaces, developer tools, developer apis, data mining, development platforms, information technology, ", "annualRevenue": null, "totalFunding": 800000, "latestFunding": "Seed", "latestFundingAmount": 660000, "lastRaisedAt": "2019-06-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 45, "firstName": "Nina", "lastName": "Dahlin", "title": "People & Culture Partner", "company": "Flower", "email": "nina.dahlin@flower.se", "emailStatus": "Verified", "seniority": "Partner", "department": "Human Resources", "employees": 130, "industry": "renewables & environment", "website": "https://flower.se", "linkedinPerson": "http://www.linkedin.com/in/nina-dahlin-b41b6080", "linkedinCompany": "http://www.linkedin.com/company/flowertechnologies", "country": "Sweden", "city": "Stockholm", "technologies": "Route 53, Gmail, Google Apps, Microsoft Office 365, Amazon AWS, Slack, Google Tag Manager, Mobile Friendly, WordPress.org, Linkedin Marketing Solutions, Remote, Databricks, dbt, Python, Airflow, Dagster, Spark, Terraform, AWS CloudFormation, Git, AI, Google Cloud Machine Learning Engine", "keywords": "battery storage, aggregator, sustainable power, electric flexibility, virtual power plant, renewable energy, services for renewable energy, demand response, fossil-free energy transition, local renewa", "annualRevenue": null, "totalFunding": 38190000, "latestFunding": "Series A", "latestFundingAmount": 27500000, "lastRaisedAt": "2024-08-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 46, "firstName": "Gerard", "lastName": "Forde", "title": "Founder", "company": "Bizimply", "email": "gerard@bizimply.com", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite", "employees": 61, "industry": "information technology & services", "website": "https://bizimply.com", "linkedinPerson": "http://www.linkedin.com/in/gerforde", "linkedinCompany": "http://www.linkedin.com/company/bizimply", "country": "Ireland", "city": "", "technologies": "Sendgrid, Gmail, Google Apps, VueJS, WP Engine, Atlassian Cloud, React, Hubspot, Slack, AI, Airflow, Python, SQL, dbt, AWS Trusted Advisor, IBM ILOG CPLEX Optimization Studio, Microsoft Azure Monitor, Snowflake, Google Cloud BigQuery, Redshift", "keywords": "restaurant management, employee scheduling, ruby on rails, retail management, hr management, time & attendance, business performance, cloud software, scheduling, e-commerce, saas, restaurants, enterpr", "annualRevenue": 4000000, "totalFunding": 2200000, "latestFunding": "Series A", "latestFundingAmount": 2200000, "lastRaisedAt": "2016-04-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 47, "firstName": "Natalia", "lastName": "Fateeva", "title": "Tech Recruitment Partner", "company": "Humanoid", "email": "natf@thehumanoid.ai", "emailStatus": "Verified", "seniority": "Partner", "department": "Human Resources", "employees": 160, "industry": "mechanical or industrial engineering", "website": "https://thehumanoid.ai", "linkedinPerson": "http://www.linkedin.com/in/natalia-fateeva-4849ab28", "linkedinCompany": "http://www.linkedin.com/company/humanoidai", "country": "Germany", "city": "Berlin", "technologies": "Route 53, Amazon SES, Gmail, Google Apps, Amazon AWS, Hubspot, Nginx, YouTube, Google Tag Manager, WordPress.org, Mobile Friendly, Altium, C#, CAT, Cross Pixel Media, LabVIEW, MATLAB, Python, Tor, Verilog, VHDL, Linkedin Marketing Solutions, Twitter Advertising, Instagram, Amber, Analyzer, AT&T, CET, EMC, Endurance, Microsoft Office 365 E1, Simulink, Bash, Ubuntu, Amazon Associates, CANalyzer, Qua", "keywords": "industrial robotics, artificial intelligence, advanced manufacturing, computer vision, robotics, robotics engineering, industrial machinery manufacturing, robotic ai systems, imitation learning robots", "annualRevenue": null, "totalFunding": null, "latestFunding": "Seed", "latestFundingAmount": null, "lastRaisedAt": "2025-10-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 48, "firstName": "Denis", "lastName": "Chernilevskiy", "title": "CEO & Co-founder", "company": "Aiphoria", "email": "dc@aiforiatech.com", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite", "employees": 51, "industry": "information technology & services", "website": "https://aiphoria.ai", "linkedinPerson": "http://www.linkedin.com/in/denis-chernilevskiy-2b2b1859", "linkedinCompany": "http://www.linkedin.com/company/aiphoria-ai", "country": "Cyprus", "city": "Limassol", "technologies": "Gmail, Google Apps, Amazon AWS, YouTube, Mobile Friendly, Google Tag Manager, Hubspot, Salesforce, Gong, Apollo, Notion, Productboard, Microsoft Excel, Looker, Tableau, Kubernetes, Rancher Labs, Docker, HELM, GitHub, GitLab, Terraform, Ansible, Python, Azure Linux Virtual Machines, Amazon Web Services (AWS), Google Cloud Platform, Grafana, Prometheus, Grafana Loki, ELK Stack, PostgreSQL, ClickHous", "keywords": "iot, ai, asr, tts, python, mll, smart devices, voice assistants, computer vision, data science, aiphoria pros, agentic ai, digital workforce, speech technologies, conversational ai, technology, inform", "annualRevenue": null, "totalFunding": 34000000, "latestFunding": "Angel", "latestFundingAmount": 34000000, "lastRaisedAt": "2025-07-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 49, "firstName": "Simon", "lastName": "Smith", "title": "Head of IT", "company": "Manna Air Delivery", "email": "simon.smith@manna.aero", "emailStatus": "Verified", "seniority": "Head", "department": "Information Technology", "employees": 110, "industry": "logistics & supply chain", "website": "https://manna.aero", "linkedinPerson": "http://www.linkedin.com/in/simon-smith-a3a5142b", "linkedinCompany": "http://www.linkedin.com/company/mannaaero", "country": "Ireland", "city": "", "technologies": "Amazon SES, Outlook, Microsoft Office 365, Amazon AWS, VueJS, Appcues, Webflow, Workable, Google Play, Mobile Friendly, Google Tag Manager, YouTube, Android, AI, C#, Python, MATLAB, IBM SPSS Modeler, AWS SDK for JavaScript, Google AlloyDB for PostgreSQL, Snowflake, SQL, Intercom, React, AWS Trusted Advisor, ANGEL LMS, .NET, CANalyzer, Azure HDInsight, InsightExpress Flex, Copper, AT&T, Micro, Worl", "keywords": "transportation, logistics, supply chain & storage, local employment in drone industry, zero emissions, software engineering, services, medical supplies delivery, community safety and privacy, d2c, tec", "annualRevenue": null, "totalFunding": 64670000, "latestFunding": "Venture (Round not Specified)", "latestFundingAmount": 30470000, "lastRaisedAt": "2024-12-01", "stage": "Approaching", "emailSent": true, "replied": false }, { "id": 50, "firstName": "Gregoire", "lastName": "Hug", "title": "Founder", "company": "WeeFin", "email": "gregoire.hug@wee-fin.com", "emailStatus": "Verified", "seniority": "Founder", "department": "C-Suite", "employees": 110, "industry": "information technology & services", "website": "https://weefin.co", "linkedinPerson": "http://www.linkedin.com/in/gregoirehug", "linkedinCompany": "http://www.linkedin.com/company/weefin", "country": "France", "city": "Paris", "technologies": "Cloudflare DNS, Gmail, Google Apps, MailChimp SPF, Microsoft Office 365, Zendesk, Webflow, Hubspot, Mobile Friendly, Linkedin Marketing Solutions, Google Font API, Google Tag Manager, Remote, AI, Salesforce CRM Analytics, Python, Airflow, AWS Step Functions, Lambda Cloud, Connect, Terraform, AWS Lambda, Amazon Elastic Container Service (Amazon ECS), Amazon S3, PostgreSQL, Amazon DynamoDB, pandas, ", "keywords": "alternative finance, fintech, technology, risk, capital market, regtech, big data, apis, business agility, security servicing, asset management, esg, regulation, p2p lending, innovation, compliance, c", "annualRevenue": 27300000, "totalFunding": 39494980, "latestFunding": "Series B", "latestFundingAmount": 27500000, "lastRaisedAt": "2025-04-01", "stage": "Approaching", "emailSent": true, "replied": false }];

// ── FREE DATA HELPERS ─────────────────────────────────────────────────────────
async function scrapeWithJina(url) {
  try {
    const clean = url.startsWith("http") ? url : `https://${url}`;
    const res = await fetch(`https://r.jina.ai/${clean}`, { headers: { Accept: "text/plain" } });
    if (!res.ok) return null;
    const text = await res.text();
    console.log("----------------------------------------------------------------")
    console.log("Text: ", text)
    console.log("----------------------------------------------------------------")
    return text?.slice(0, 2500) || null;
  } catch { return null; }
}

async function searchDuckDuckGo(query) {
  try {
    const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
    const data = await res.json();
    console.log("DDG AbstractText:", data.AbstractText);
    console.log("DDG RelatedTopics count:", data.RelatedTopics?.length);
    console.log("DDG Infobox:", data.Infobox);
    const parts = [];
    if (data.AbstractText) parts.push(data.AbstractText);
    (data.RelatedTopics || []).slice(0, 5).forEach(t => { if (t.Text) parts.push(t.Text); });
    return parts.join(" | ").slice(0, 1200) || null;
  } catch { return null; }
}

const STAGES = [
  { id: "website", icon: "🌐", label: "Scraping website via Jina.ai..." },
  { id: "linkedin", icon: "💼", label: "Scraping LinkedIn via Jina.ai..." },
  { id: "ddg", icon: "🔍", label: "Searching DuckDuckGo..." },
  { id: "claude", icon: "🧠", label: "Claude synthesizing research brief..." },
];

const URGENCY_CLR = { high: "#ef4444", medium: "#f59e0b", low: "#6b7280" };
const MATURITY_CLR = { low: { bg: "#fee2e2", text: "#991b1b" }, medium: { bg: "#fef3c7", text: "#92400e" }, high: { bg: "#dcfce7", text: "#166534" } };
const SERVICE_CLR = { "Power BI": "#3b82f6", "Data Engineering": "#8b5cf6", "AI/ML": "#14b8a6" };
const TRIGGER_CLR = { growth: "#22c55e", hiring: "#3b82f6", tech: "#8b5cf6", pain: "#ef4444", industry: "#f59e0b" };

const INDUSTRIES = ["All", ...Array.from(new Set(CONTACTS.map(c => c.industry))).sort()];
const COUNTRIES = ["All", ...Array.from(new Set(CONTACTS.map(c => c.country))).filter(Boolean).sort()];

function Tag({ label, bg, color }) {
  return <span style={{ padding: "2px 9px", borderRadius: 12, fontSize: 10, fontWeight: 700, background: bg, color, whiteSpace: "nowrap" }}>{label}</span>;
}
function SectionLabel({ icon, label, color = "#6366f1" }) {
  return <div style={{ fontSize: 10, color, letterSpacing: "0.18em", fontWeight: 800, marginBottom: 12 }}>{icon} {label}</div>;
}
function fmt(n) {
  if (!n) return null;
  if (n >= 1e6) return `$\{(n/1e6).toFixed(1)\}M`;
  if (n >= 1e3) return `$\{(n/1e3).toFixed(0)\}K`;
  return String(n);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function ResearchAgent() {
  const [view, setView] = useState("list");   // list | loading | result
  const [selected, setSelected] = useState(null);
  const [stages, setStages] = useState({});
  const [activeStg, setActiveStg] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [rawData, setRawData] = useState({});
  const [savedContacts, setSavedContacts] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("researched_contacts") || "[]");
      setSavedContacts(stored);
    } catch { }
  }, []);

  // filters
  const [search, setSearch] = useState("");
  const [industryF, setIndustryF] = useState("All");
  const [countryF, setCountryF] = useState("All");

  const filtered = useMemo(() => CONTACTS.filter(c => {
    const q = search.toLowerCase();
    const matchQ = !q || c.company.toLowerCase().includes(q) || c.firstName.toLowerCase().includes(q) || c.lastName.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
    const matchI = industryF === "All" || c.industry === industryF;
    const matchC = countryF === "All" || c.country === countryF;
    return matchQ && matchI && matchC;
  }), [search, industryF, countryF]);

  const upStage = (id, st) => setStages(s => ({ ...s, [id]: st }));

  const run = async (contact) => {
    setSelected(contact);
    setView("loading");
    setStages({});
    setActiveStg(null);
    setResult(null);
    setError(null);
    const col = {};

    try {
      setActiveStg("website");
      if (contact.website) {
        const t = await scrapeWithJina(contact.website);
        col.websiteText = t;
        upStage("website", t ? "done" : "warn");
      } else upStage("website", "skip");

      setActiveStg("linkedin");
      if (contact.linkedinCompany) {
        const t = await scrapeWithJina(contact.linkedinCompany);
        col.linkedinText = t;
        upStage("linkedin", t ? "done" : "warn");
      } else upStage("linkedin", "skip");

      setActiveStg("ddg");
      const ddg = await searchDuckDuckGo(`${contact.company} ${contact.industry} ${contact.city || contact.country}`);
      col.ddgText = ddg;
      upStage("ddg", ddg ? "done" : "warn");

      setActiveStg("claude");
      setRawData(col);

      const apiRes = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: contact.company,
          website: contact.website,
          linkedin: contact.linkedinCompany,
          contact: `${contact.firstName} ${contact.lastName}`,
          email: contact.email,
          // Extra Apollo context passed to Claude
          apolloContext: {
            title: contact.title,
            department: contact.department,
            seniority: contact.seniority,
            industry: contact.industry,
            employees: contact.employees,
            country: contact.country,
            city: contact.city,
            technologies: contact.technologies,
            keywords: contact.keywords,
            totalFunding: contact.totalFunding,
            latestFunding: contact.latestFunding,
            latestFundingAmount: contact.latestFundingAmount,
            lastRaisedAt: contact.lastRaisedAt,
            annualRevenue: contact.annualRevenue,
          },
          ...col,
        }),
      });

      const apiData = await apiRes.json();
      if (apiData.error) throw new Error(apiData.error);
      upStage("claude", "done");
      setResult(apiData.result);
      setView("result");
    } catch (e) {
      setError("Research failed: " + e.message);
      setView("list");
    }
  };

  const reset = () => { setView("list"); setResult(null); setSelected(null); };
  const saveResult = () => {
    const entry = {
      savedAt: new Date().toISOString(),
      contact: {
        name: `${selected.firstName} ${selected.lastName}`,
        title: selected.title,
        email: selected.email,
        company: selected.company,
        industry: selected.industry,
        country: selected.country,
        employees: selected.employees,
        website: selected.website,
        latestFunding: selected.latestFunding,
        totalFunding: selected.totalFunding,
      },
      research: {
        summary: result.company_summary,
        datMaturity: result.data_maturity,
        primaryService: result.best_service_fit?.primary,
        upsell: result.best_service_fit?.upsell,
        subjectLine: result.subject_line,
        recommendedAngle: result.recommended_angle,
        painPoints: result.top_pain_points?.map(p => p.pain).join(" | "),
        triggers: result.triggers?.map(t => t.trigger).join(" | "),
        hook1: result.personalization_hooks?.[0],
        hook2: result.personalization_hooks?.[1],
        confidence: result.confidence,
      }
    };

    const updated = [...savedContacts.filter(s => s.contact.email !== entry.contact.email), entry];
    setSavedContacts(updated);
    localStorage.setItem("researched_contacts", JSON.stringify(updated));
    alert(`Saved! ${updated.length} contact(s) in your campaign list.`);
  };

  const downloadCSV = () => {
    if (savedContacts.length === 0) return alert("No contacts saved yet.");
    const headers = [
      "Saved At", "Name", "Title", "Email", "Company", "Industry", "Country",
      "Employees", "Website", "Latest Funding", "Total Funding",
      "Data Maturity", "Primary Service", "Upsell Service",
      "Subject Line", "Recommended Angle", "Pain Points", "Triggers",
      "Hook 1", "Hook 2", "Confidence"
    ];
    const rows = savedContacts.map(s => [
      s.savedAt, s.contact.name, s.contact.title, s.contact.email,
      s.contact.company, s.contact.industry, s.contact.country,
      s.contact.employees, s.contact.website, s.contact.latestFunding,
      s.contact.totalFunding, s.research.datMaturity, s.research.primaryService,
      s.research.upsell, s.research.subjectLine, s.research.recommendedAngle,
      s.research.painPoints, s.research.triggers, s.research.hook1,
      s.research.hook2, s.research.confidence
    ].map(v => `"${String(v ?? "").replace(/"/g, '""')}"`));

    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `campaign_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  // ── LIST VIEW ────────────────────────────────────────────────────────────────
  if (view === "list") return (
    <div style={{ minHeight: "100vh", background: "#f8f9fc", fontFamily: "var(--font-inter, system-ui, sans-serif)" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e9ecef", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
          <div>
            <div style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: 16, fontWeight: 800, color: "#111" }}>Market Research Agent</div>
            <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.15em" }}>POWER BI · DATA ENG · AI/ML · {CONTACTS.length} APOLLO CONTACTS LOADED</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["🌐 Jina.ai", "🔍 DuckDuckGo", "🧠 Claude"].map(l => (
            <span key={l} style={{ padding: "4px 10px", borderRadius: 20, background: "#f3f4f6", fontSize: 10, color: "#6b7280", fontWeight: 600 }}>{l}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        {error && <div style={{ padding: "10px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 12, color: "#dc2626", marginBottom: 16 }}>⚠️ {error}</div>}

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Search company, name, title..."
            style={{ padding: "9px 14px", borderRadius: 9, border: "1.5px solid #e5e7eb", fontSize: 13, color: "#111", background: "#fff", fontFamily: "inherit", flex: "1", minWidth: 200 }}
          />
          <select value={industryF} onChange={e => setIndustryF(e.target.value)}
            style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid #e5e7eb", fontSize: 12, color: "#374151", background: "#fff", fontFamily: "inherit", cursor: "pointer" }}>
            {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
          </select>
          <select value={countryF} onChange={e => setCountryF(e.target.value)}
            style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid #e5e7eb", fontSize: 12, color: "#374151", background: "#fff", fontFamily: "inherit", cursor: "pointer" }}>
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{filtered.length} of {CONTACTS.length} contacts</div>
        </div>

        {/* Contact Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {filtered.map(c => (
            <div key={c.id} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "1px solid #e9ecef", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", transition: "transform 0.15s, box-shadow 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; }}>

              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: 15, fontWeight: 800, color: "#111" }}>{c.company}</div>
                  <div style={{ fontSize: 11, color: "#6366f1", marginTop: 2 }}>{c.industry}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ padding: "2px 8px", borderRadius: 20, background: "#f3f4f6", fontSize: 10, color: "#6b7280", fontWeight: 600 }}>{c.employees} emp</span>
                  {c.latestFunding && c.latestFunding !== "null" && (
                    <span style={{ padding: "2px 8px", borderRadius: 20, background: "#eef2ff", fontSize: 10, color: "#6366f1", fontWeight: 600 }}>{c.latestFunding}</span>
                  )}
                </div>
              </div>

              {/* Contact */}
              <div style={{ fontSize: 12, color: "#374151", marginBottom: 6, fontWeight: 600 }}>
                {c.firstName} {c.lastName}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>{c.title}</div>

              {/* Meta row */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, color: "#6b7280" }}>📍 {c.city ? c.city + ", " : ""}{c.country}</span>
                {c.annualRevenue && <span style={{ fontSize: 10, color: "#6b7280" }}>💰 {fmt(c.annualRevenue)} ARR</span>}
                {c.totalFunding && <span style={{ fontSize: 10, color: "#6b7280" }}>🏦 {fmt(c.totalFunding)} raised</span>}
              </div>

              {/* Tech snippet */}
              {c.technologies && (
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 14, lineHeight: 1.5, borderLeft: "2px solid #e5e7eb", paddingLeft: 8 }}>
                  {c.technologies.split(",").slice(0, 4).map(t => t.trim()).join(" · ")}...
                </div>
              )}

              <button onClick={() => run(c)} style={{ width: "100%", padding: "10px", borderRadius: 9, background: "#6366f1", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#4338ca"}
                onMouseLeave={e => e.currentTarget.style.background = "#6366f1"}>
                ⚡ Research {c.firstName} @ {c.company} →
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14 }}>No contacts match your filters</div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {savedContacts.length > 0 && (
          <button onClick={downloadCSV} style={{ padding: "8px 16px", borderRadius: 8, background: "#6366f1", border: "none", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 700, fontFamily: "inherit" }}>
            Export CSV ({savedContacts.length})
          </button>
        )}
        {["Jina.ai", "🔍 DuckDuckGo", "🧠 Claude"].map(l => (
          <span key={l} style={{ padding: "4px 10px", borderRadius: 20, background: "#f3f4f6", fontSize: 10, color: "#6b7280", fontWeight: 600 }}>{l}</span>
        ))}
      </div>
    </div>


  );

  // ── LOADING VIEW ──────────────────────────────────────────────────────────────
  if (view === "loading" && selected) return (
    <div style={{ minHeight: "100vh", background: "#f8f9fc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter, system-ui, sans-serif)" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 540, textAlign: "center" }}>
        <div style={{ width: 52, height: 52, border: "3px solid #e5e7eb", borderTopColor: "#6366f1", borderRadius: "50%", margin: "0 auto 20px", animation: "spin 0.9s linear infinite" }} />
        <div style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: 22, fontWeight: 800, color: "#111", marginBottom: 4 }}>Researching {selected.company}</div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 32 }}>{selected.firstName} {selected.lastName} · {selected.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {STAGES.map(stage => {
            const st = stages[stage.id], isAct = activeStg === stage.id;
            return (
              <div key={stage.id} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "13px 18px", borderRadius: 12, transition: "all 0.3s",
                background: isAct ? "#eef2ff" : st === "done" ? "#f0fdf4" : st === "warn" ? "#fffbeb" : "#fff",
                border: `1px solid ${isAct ? "#c7d2fe" : st === "done" ? "#bbf7d0" : st === "warn" ? "#fde68a" : "#e5e7eb"}`
              }}>
                <div style={{ fontSize: 20, width: 28 }}>
                  {st === "done" ? "✅" : st === "warn" ? "⚠️" : st === "skip" ? "⏭️"
                    : isAct ? <span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>⏳</span>
                      : <span style={{ opacity: 0.3 }}>{stage.icon}</span>}
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: isAct ? "#4338ca" : st === "done" ? "#15803d" : st === "warn" ? "#92400e" : "#9ca3af" }}>{stage.icon} {stage.label}</div>
                  {st === "warn" && <div style={{ fontSize: 10, color: "#b45309", marginTop: 2 }}>No data — Claude will use Apollo data + industry knowledge</div>}
                  {st === "skip" && <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>Skipped</div>}
                </div>
                {st === "done" && <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── RESULT VIEW ────────────────────────────────────────────────────────────────
  if (view === "result" && result && selected) {
    const mc = MATURITY_CLR[result.data_maturity] || MATURITY_CLR.medium;
    const sc = SERVICE_CLR[result.best_service_fit?.primary] || "#6366f1";
    const card = { background: "#fff", borderRadius: 14, padding: "20px 22px", border: "1px solid #e9ecef", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" };

    return (
      <div style={{ minHeight: "100vh", background: "#f8f9fc", fontFamily: "var(--font-inter, system-ui, sans-serif)" }}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}.a1{animation:fadeUp 0.4s ease 0.05s both}.a2{animation:fadeUp 0.4s ease 0.12s both}.a3{animation:fadeUp 0.4s ease 0.19s both}.a4{animation:fadeUp 0.4s ease 0.26s both}`}</style>

        {/* Nav */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e9ecef", padding: "12px 24px", display: "flex", alignItems: "center", gap: 14, position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={reset} style={{ padding: "7px 16px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>← Back to List</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: 17, fontWeight: 800, color: "#111" }}>{selected.company}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{selected.firstName} {selected.lastName} · {selected.title} · {selected.email}</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Tag label={`Data: ${(result.data_maturity || "").toUpperCase()}`} bg={mc.bg} color={mc.text} />
            <Tag label={result.best_service_fit?.primary || ""} bg={sc + "18"} color={sc} />
            <Tag label={`Confidence: ${(result.confidence || "").toUpperCase()}`} bg="#f1f5f9" color="#475569" />
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>

          {/* Apollo context bar */}
          <div className="a1" style={{ display: "flex", gap: 16, padding: "12px 18px", background: "#fff", borderRadius: 10, border: "1px solid #e9ecef", marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.1em" }}>APOLLO DATA:</span>
            {[
              selected.industry && `🏭 ${selected.industry}`,
              selected.employees && `👥 ${selected.employees} employees`,
              selected.country && `📍 ${selected.country}`,
              selected.latestFunding && `💰 ${selected.latestFunding}`,
              selected.totalFunding && `🏦 ${fmt(selected.totalFunding)} raised`,
              selected.lastRaisedAt && `📅 Last raised: ${selected.lastRaisedAt}`,
            ].filter(Boolean).map(label => (
              <span key={label} style={{ fontSize: 11, color: "#374151" }}>{label}</span>
            ))}
          </div>

          {/* Hero */}
          <div className="a1" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 16, padding: "22px 28px", marginBottom: 16, display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#c7d2fe", letterSpacing: "0.2em", marginBottom: 8, fontWeight: 700 }}>✉️ COLD EMAIL SUBJECT LINE</div>
              <div style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: 21, fontWeight: 800, color: "#fff", marginBottom: 12 }}>"{result.subject_line}"</div>
              <div style={{ fontSize: 12, color: "#e0e7ff", lineHeight: 1.75 }}>{result.recommended_angle}</div>
            </div>
            <div style={{ flexShrink: 0, background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "16px 20px", textAlign: "center", minWidth: 140 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🎯</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{result.best_service_fit?.primary}</div>
              <div style={{ fontSize: 10, color: "#c7d2fe", marginTop: 6 }}>then upsell →</div>
              <div style={{ fontSize: 11, color: "#e0e7ff", fontWeight: 600, marginTop: 2 }}>{result.best_service_fit?.upsell}</div>
            </div>
          </div>

          {/* Summary + Maturity */}
          <div className="a2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={card}>
              <SectionLabel icon="🏢" label="COMPANY SUMMARY" />
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8 }}>{result.company_summary}</div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f3f4f6", fontSize: 11, color: "#6b7280" }}>
                Service fit: <span style={{ color: sc, fontWeight: 600 }}>{result.best_service_fit?.reason}</span>
              </div>
            </div>
            <div style={card}>
              <SectionLabel icon="💡" label="DATA MATURITY" color={mc.text} />
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: 34, fontWeight: 800, color: mc.text }}>{(result.data_maturity || "").toUpperCase()}</div>
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.7, marginBottom: 12 }}>{result.data_maturity_reason}</div>
              {result.tech_clues?.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.1em", marginBottom: 6 }}>TECH CLUES (from Apollo)</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {result.tech_clues.slice(0, 6).map((t, i) => <span key={i} style={{ padding: "2px 8px", borderRadius: 6, background: "#f3f4f6", fontSize: 10, color: "#4b5563" }}>{t}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3 Cols */}
          <div className="a3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={card}>
              <SectionLabel icon="🔴" label="PAIN POINTS" color="#dc2626" />
              {result.top_pain_points?.map((p, i) => (
                <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < result.top_pain_points.length - 1 ? "1px solid #f9fafb" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#111", lineHeight: 1.4 }}>{p.pain}</div>
                    <span style={{ padding: "2px 7px", borderRadius: 10, fontSize: 9, fontWeight: 700, background: (URGENCY_CLR[p.urgency] || "#6b7280") + "18", color: URGENCY_CLR[p.urgency] || "#6b7280", flexShrink: 0 }}>{p.urgency}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#9ca3af", lineHeight: 1.6 }}>{p.evidence}</div>
                </div>
              ))}
            </div>
            <div style={card}>
              <SectionLabel icon="⚡" label="BUY TRIGGERS" color="#d97706" />
              {result.triggers?.map((t, i) => (
                <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < result.triggers.length - 1 ? "1px solid #f9fafb" : "none" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#111", marginBottom: 6, lineHeight: 1.4 }}>{t.trigger}</div>
                  <Tag label={t.type} bg={(TRIGGER_CLR[t.type] || "#6b7280") + "18"} color={TRIGGER_CLR[t.type] || "#6b7280"} />
                </div>
              ))}
            </div>
            <div style={card}>
              <SectionLabel icon="🪝" label="PERSONALIZATION HOOKS" color="#7c3aed" />
              {result.personalization_hooks?.map((h, i) => (
                <div key={i} style={{ padding: "10px 12px", borderRadius: 9, marginBottom: 10, background: i === 0 ? "#eef2ff" : "#faf5ff", borderLeft: `3px solid ${i === 0 ? "#6366f1" : "#8b5cf6"}`, fontSize: 11, color: "#374151", lineHeight: 1.7 }}>
                  <div style={{ fontSize: 9, color: i === 0 ? "#6366f1" : "#7c3aed", fontWeight: 700, marginBottom: 4, letterSpacing: "0.1em" }}>{i === 0 ? "EMAIL 1 OPENER" : "FOLLOW-UP ANGLE"}</div>
                  "{h}"
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}

          <div style={{ display: "flex", gap: 8, marginLeft: "auto", alignItems: "center" }}>
            {savedContacts.some(s => s.contact.email === selected?.email)
              ? <span style={{ fontSize: 11, color: "#15803d", fontWeight: 600 }}>✅ Already saved</span>
              : <button onClick={saveResult} style={{ padding: "7px 16px", borderRadius: 8, background: "#6366f1", border: "none", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>
                💾 Save to Campaign
              </button>
            }
            <button onClick={downloadCSV} style={{ padding: "7px 16px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>
              ⬇️ Download CSV ({savedContacts.length})
            </button>
            {/* <button onClick={reset} style={{ padding: "7px 16px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>← Back to List</button> */}
          </div>

          <div className="a4" style={{ padding: "14px 20px", background: "#fff", borderRadius: 12, border: "1px solid #e9ecef", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.1em" }}>DATA SOURCES:</div>
            {[
              { label: "Apollo (50 fields)", ok: true, icon: "🎯" },
              { label: "Website scrape", ok: !!rawData.websiteText, icon: "🌐" },
              { label: "LinkedIn scrape", ok: !!rawData.linkedinText, icon: "💼" },
              { label: "DuckDuckGo", ok: !!rawData.ddgText, icon: "🔍" },
              { label: "Claude AI", ok: true, icon: "🧠" },
            ].map(({ label, ok, icon }) => (
              <span key={label} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ok ? "#f0fdf4" : "#fef2f2", color: ok ? "#15803d" : "#dc2626", border: `1px solid ${ok ? "#bbf7d0" : "#fecaca"}` }}>{icon} {label} {ok ? "✓" : "✗"}</span>
            ))}
            <button onClick={reset} style={{ marginLeft: "auto", padding: "7px 16px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>← Back to List</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
