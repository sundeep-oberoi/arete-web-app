# Multistep Web Form
- With a progress bar
- With two levels of progress: phases & steps
- With a leave and come back button

# Phase: Situation
- Say here we collect general information
- 5 questions to understand your situation
- Lets get started
## Step: General Profile
- Select your profile on a clickable card screen
- Options: Employee, Self-employed, Retired, Civil servant, Student
- Single choice
- Mandatory
## Step: Partner
- Answer the question about covering your partner with 1 click
- Explain the quote includes or excludes your partner, with the option that you can change this choice anytime after subscription
- Optional, default to partner not covered
## Step: Children
- Indicate whether I wish to cover my children
- How many children
- Expalin that the premium accurately reflects the composition of my household. Children over 25 must take out their own policy
- Optional, default to children not covered
## Step: Age
- Enter your age
- Explain your premium is calculated based on your actual age, without entering a full date of birth
- If you enter an out-of-range age (< 18 or > 85), then show an error and do not allow to continue
- Mandatory
## Step: Postcode
- Where do you live? Enter your postcode in a single field
- Explain the offer is priced according to your geographic zone
- Mandatory, valid French post code

# Phase: Special Needs
- Say let's find the offer that's right for you
- 5 questions about your health needs to recommend the best solution
- Let's continue
## Step: Optical needs
- Select your level of optical use from 4 plain-language options
- You have options: 'Nothing at all', 'Standard glasses or contact lenses', 'Progressive lenses' or 'I'm planning eye surgery'
- Explain that the optical benefits offered match my actual usage
- Optional, default to 'Noting at all'
## Step: Dental needs
- Select my level of dental need from 4 options with explanatory subtitles
- Explain you are covered for the dental treatments that genuinely concern you
- You have options: 'No cover', 'Just maintenance (Scale & polish, fillings, check-ups)','Standard treatments (Crowns, bridges, root canals)', 'Major treatments (Implants, braces)'
- Optional, default to 'No cover'
## Step: Alternative medicine
- You indicate how frequently you use alternative medicine
- Explain this is to obtain coverage adapted to your actual use of complementary therapies
- Options: 'Never or almost never', '1 to 2 times a year', 'More than 3 times a year'
- Optional, default to 'Never or almost never'
## Step: Hospitalisation preferences
- Options: 'A shared room suits me', 'I prefer a private room if possible', 'A private room is essential for me'
- Explain option for private room with a average daily cost cover
- Get the average daily room cost dynamically
- Optional, default to 'A shared room suits me'
## Step: Choice of doctors
- Options: 'GPs and occasionally a specialist', 'Specialists at standard rates', ' /'Specialists, private rates'
- Mandatory

# Phase: Contact details
- Say 'Just one more step before your personalised offer', 'Last piece of information before we present the coverage most suited to your profile'
## Step: Contact Details
- Valid email, inline validation
- Valid French phone number, 10 digits, starts with 06 or 07. Add a note 'Useful if you would like to be called back by an advisor'
- Message below the fields: 'We will use your contact details to assist you in your process, by email or phone. See our privacy policy'
- Mandatory, any one email or phone number 

# Phase: Recap
- Show a summary of responses
- Show a 'View my offer' button

# Phase: Review offer
- Get the final offer and show the price in euros 
- Show a summary of responses

# Leave and come back
- Say we will send you a link to return to the form. Complete it at your pace
- Request an email before leaving
- Must be a valid email, inline validation
- Save the email address
- Show a thank you, have a nice day page

# Backend APIs
## Get average daily room cost
- Get the room cost by using an API, send all collected responses

## Save the email address when leave and come back 
- Save the email address by using an API, send all collected responses

# Get the final offer
- Get the final offer by using an API, send all collected responses
- This API can take about 60 seconds, so keep a higher timeout