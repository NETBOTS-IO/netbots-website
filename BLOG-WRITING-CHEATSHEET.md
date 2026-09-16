# NetBots Blog Content & Formatting Cheat Sheet

Ye document aapko (ya kisi bhi AI Agent ko) batayega ke NetBots ke Blog API ke liye content exactly kaise structure karna hai, konsa tag kahan use hoga, keywords kaise likhne hain, aur internal links kaise add karne hain.

---

## 1. Complete JSON Structure (Template)

Jab bhi naya blog likhna ho, is exact JSON structure ko follow karein:

```json
{
  "title": "Aapke Blog Ka Main Title (H1)",
  "excerpt": "Blog ka chota sa khulasa (Meta Description) jo Google search aur cards par show hoga.",
  "category": "AI & Automation", 
  "draft": true,
  "tags": ["SEO", "Next.js", "Pakistan", "NetBots"],
  "seo": {
    "metaTitle": "Search Engine Ke Liye Title (Optional)",
    "metaDescription": "Search Engine Ke Liye Description (Optional)",
    "keywords": ["AI Automation Skardu", "Best web agency Pakistan", "Software house"]
  },
  "eeat": {
    "keyTakeaways": [
      "Pehla ahem point",
      "Doosra ahem point"
    ],
    "experienceHighlight": "Humne ye same strategy apne e-commerce client par apply ki jis se unki sales 40% badh gayi.",
    "reviewedBy": {
      "name": "Saqlain Shah",
      "role": "Founder & CEO, NetBots",
      "credentials": "Full-Stack Engineer · AI Systems Architect",
      "linkedIn": "https://www.linkedin.com/in/syedsaqlainabbas110"
    },
    "citations": [
      {
        "title": "Google SEO Guidelines",
        "url": "https://developers.google.com/search/docs",
        "publisher": "Google",
        "year": "2024"
      }
    ],
    "faqs": [
      {
        "question": "NetBots kahan based hai?",
        "answer": "NetBots ka headquarter Skardu, Gilgit-Baltistan mein hai."
      }
    ]
  },
  "paragraphs": [
    "Ye blog ka pehla paragraph hai jo automatically introduction ban jayega.",
    "## 1. Yahan Se H2 Heading Shuru Hogi",
    "Heading ke baad ap normal text likh sakte hain.",
    "Agar kisi cheez par zor dena ho to **usko bold karein**.",
    "### Ye H3 Sub-Heading Hai",
    "Agar aapko NetBots ki kisi dusri service ka link dena hai to aise dein: [Humari AI Automation Service dekhein](/services/ai-automation).",
    "- Ye bullet point 1 hai",
    "- Ye bullet point 2 hai",
    "1. Ye numbered list 1 hai",
    "2. Ye numbered list 2 hai",
    "> Ye ek quotation block hai. Isey ahem baat highlight karne ke liye use karein."
  ]
}
```

---

## 2. Formatting Rules (`paragraphs` Array ke andar)

Sanity CMS automatically aapke string array ko rich text (Portable Text) mein convert karta hai. Aapne bas in Markdown prefixes ka khayal rakhna hai:

### Headings (Tags)
*   **Main Title (H1):** Ye JSON ke `title` field mein jayega. `paragraphs` mein kabhi `H1` mat use karein.
*   **H2 Heading:** String ke shuru mein `## ` lagayen. Example: `"## Core Benefits"`
*   **H3 Sub-Heading:** String ke shuru mein `### ` lagayen. Example: `"### Cost Reduction"`

### Text Styling
*   **Bold:** Kisi word ko strong karna ho: `"Ye tool **bohat fast** hai."`
*   **Italic:** Teda likhne ke liye: `"Ye *latest* technology hai."`

### Links Add Karna (Sab Se Important SEO Factor)
Internal linking (apni hi site ke doosre pages ko link karna) SEO ke liye bohot zaroori hai. Link banane ka formula: `[Anchor Text](URL)`

*   **Internal Link (Apni website ka):** Pura URL likhne ki zaroorat nahi, sirf path likhein.
    *   *Galat:* `"Humari site dekhein: https://netbots.io/services"`
    *   *Sahi:* `"[Humari Services Dekhein](/services)"`
    *   *Example in JSON:* `"Agar aap software banwana chahte hain, to humari [Custom Software Development](/services/software-dev) team se rabta karein."`
*   **External Link (Bahar ki website ka):** Pura `https://` wala link dein.
    *   *Example:* `"[Google Search Central](https://developers.google.com/search) ke mutabiq..."`

### Lists (Points)
*   **Bullet Points:** String ke start mein `- ` lagayen.
*   **Number Points:** String ke start mein `1. ` lagayen.

### Quotes & Highlights
*   **Blockquote:** String ke start mein `> ` lagayen.
    *   *Example:* `"> NetBots Pakistan ka fastest growing AI agency hai."`

---

## 3. SEO Keywords & Tags Kaise Likhne Hain

**1. `tags` Array:**
Ye blog post ke upar chote chote badge (pills) ki tarah show hote hain.
*   *Rule:* Sirf 3 se 5 tags use karein. Words chote aur clear hon.
*   *Sahi Example:* `["AI", "SaaS", "NetBots", "Skardu"]`
*   *Galat Example:* `["best artificial intelligence software company in pakistan"]` (Ye bohot lamba hai)

**2. `seo.keywords` Array:**
Ye keywords page ke code (`<meta name=\"keywords\">`) mein chupte hain aur Google ko context dete hain.
*   *Rule:* Yahan long-tail (lambe) search keywords dalen jo log Google par search karte hain.
*   *Example:* `["hotel management software without internet", "best software house in gilgit baltistan", "netbots ai automation"]`

---

## 4. E-E-A-T Fields (Rank Karne Ka Asal Raaz)

Google ab un articles ko rank karta hai jin mein E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) ho.

*   **`keyTakeaways`:** Blog ke top par 3 ahem baatein jo user ka time bachayen.
*   **`experienceHighlight`:** Yahan humesha "Humne" (First Person) use karein. Google un logo ko rank karta hai jo apna real tajurba (experience) batate hain, na ke sirf theory.
    *   *Example:* `"Humne HotelSync PMS ko directly Hunza ke remote hotels mein deploy kiya jahan internet nahi tha."`
*   **`faqs`:** Kam az kam 2-3 FAQs lazmi dalein. Ye Google ke "People Also Ask" section mein aapko direct rank karwa dete hain.
a