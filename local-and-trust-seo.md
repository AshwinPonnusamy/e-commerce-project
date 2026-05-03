# Local SEO and Trust Signals: Omni Store Online

## Local SEO Listings (Backlink Strategy)
To establish authority in the Indian market, list Omni Store Online on the following platforms:
1. **Google Business Profile**: Essential if there is a physical warehouse or office.
2. **IndiaMART**: High authority for B2B and wholesale visibility.
3. **Meesho Seller Hub**: Great for reaching tier-2 and tier-3 city shoppers.
4. **Flipkart/Amazon Seller**: Even if selling on your own site, having a presence here builds brand trust and provides high-quality backlinks.

## Trust Signals
Implement these visible elements to improve conversion rates:
- **Return Policy Page**: A clear 7-day or 30-day return policy linked in the footer.
- **SSL Badge**: Ensure the "Secure" padlock is visible (handled by Netlify/HTTPS).
- **Payment Icons**: Display logos for Razorpay, UPI, Visa, Mastercard, and "COD Available" in the footer.
- **Customer Reviews**: Real photos and text reviews from verified buyers.

## Home Page FAQ Schema
Add this to the Home page JSON-LD to answer common customer queries directly in search results:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does Omni Store Online offer free delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer free standard delivery on all orders across India."
      }
    },
    {
      "@type": "Question",
      "name": "Can I pay via Cash on Delivery (COD)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we support Cash on Delivery for most pincodes in India."
      }
    }
  ]
}
```

## Review Strategy
- **Post-Purchase Emails**: Automated emails 5 days after delivery asking for a review.
- **Incentives**: Offer a small discount (e.g., 5% off next order) for reviews with photos.
- **User-Generated Content (UGC)**: Feature customer photos on your social media to build community trust.
