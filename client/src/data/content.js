export const processSteps = [
  ['Tell us the problem', 'Call, WhatsApp or send the enquiry form with your chimney type and what is going wrong.'],
  ['Inspection', 'A technician checks the filter, motor, ducting and controls to find the cause.'],
  ['Clear recommendation', 'You are told what needs doing before work begins. Parts depend on your model and availability.'],
  ['Service and test', 'Work is completed and the chimney is run to check suction and noise.']
];
export const services = [
  { slug: 'chimney-repair', page: true, title: 'Kitchen Chimney Repair', short: 'Diagnosis and repair for chimneys that are weak, noisy or not switching on.',
    image: '/images/service_repair.jpg',
    includes: ['Fault inspection', 'Motor, switch and control checks', 'Repair or replacement advice', 'Test run after repair'],
    symptoms: ['Poor suction', 'Rattling or humming noise', 'Chimney will not switch on', 'Smoke or smell spreading in the kitchen'],
    intro: 'A chimney that stops pulling smoke is usually down to a blocked filter, a worn motor or a loose part. We inspect first, then explain what the fix involves.',
    faqs: [['Can you repair every brand?', 'Not necessarily. Parts availability depends on the brand and model, so we confirm after inspection.'], ['Should I repair or replace?', 'If the repair is minor, repairing makes sense. If the unit is heavily worn we will tell you plainly.']] },
  { slug: 'chimney-cleaning', page: true, title: 'Chimney Deep Cleaning', short: 'Removal of oil and grease from filters, blades and the body.',
    image: '/images/service_cleaning.jpg',
    includes: ['Filter removal and degreasing', 'Cleaning of the interior and blades where accessible', 'Oil collector cleaning', 'Reassembly and test'],
    symptoms: ['Dripping oil', 'Sticky, clogged filters', 'Reduced airflow', 'Strong cooking smell lingering'],
    intro: 'Cooking oil settles inside a chimney over time. Regular deep cleaning restores airflow and reduces strain on the motor.',
    faqs: [['How often should a chimney be cleaned?', 'It depends on how much you fry and cook. Homes with heavy daily cooking need it more often than light-use kitchens.'], ['Do I need to remove the chimney?', 'Usually not. Most cleaning is done in place.']] },
  { slug: 'chimney-installation', page: true, title: 'Chimney Installation', short: 'Wall or ceiling mounting, ducting and electrical connection for a new chimney.',
    image: '/images/service_installation.jpg',
    includes: ['Mounting at a suitable height', 'Duct routing and fitting', 'Connection to your power point', 'Test run'],
    symptoms: ['New chimney not yet fitted', 'Moving to a new home', 'Duct too long or sharply bent', 'Uncertain about mounting height'],
    intro: 'Correct installation affects how well a chimney performs. Height, duct length and bends all matter, so we check your kitchen layout first.',
    faqs: [['Do you supply the chimney?', 'We install chimneys you have bought. Ask us if you need anything else.'], ['Can you fit my chimney after a renovation?', 'Yes, subject to wall and duct conditions on site.']] },
  { slug: 'chimney-maintenance', page: true, title: 'Chimney Maintenance', short: 'Routine checks to keep your chimney working reliably.',
    image: '/images/service_maintenance.jpg',
    includes: ['Filter and oil collector cleaning', 'Motor and fan check', 'Control and light check', 'Advice on upkeep'],
    symptoms: ['Chimney has not been serviced in a long time', 'Gradual loss of suction', 'Heavy daily cooking', 'Preparing a rented or older kitchen'],
    intro: 'Small problems are cheaper to fix than failures. Routine maintenance catches wear early and keeps airflow steady.',
    faqs: [['Is maintenance different from cleaning?', 'Cleaning removes grease. Maintenance also checks the motor, controls and fittings.'], ['Do you offer yearly plans?', 'Ask us on call about what is currently available.']] },
  { slug: 'hob-gas-stove', page: true, title: 'Hob & Gas Stove Service', short: 'Reliable hob service, hob repair, hob installation, burner repair, and cooktop service. We safely resolve gas leakage issues to keep your kitchen secure.',
    image: '/images/service_hob_stove.jpg',
    includes: ['Hob & stove diagnosis', 'Burner repair & flame adjustment', 'Gas leakage inspection & fixing', 'Auto-ignition & spark lighter repair', 'Hob installation & glass-top care'],
    symptoms: ['Low or uneven burner flame', 'Smell of gas or suspected leak', 'Auto-ignition not sparking or clicking endlessly', 'Blocked brass burner nozzles', 'Loose knob controls or burner turning off', 'New hob requiring counter fitting'],
    intro: 'Reliable hob service, hob repair, hob installation, burner repair, and cooktop service. We safely resolve gas leakage issues to keep your kitchen secure.',
    faqs: [['How quickly do you attend gas leakage issues?', 'Gas leaks are handled with top urgency. We dispatch available doorstep technicians promptly across Chandigarh Tricity.'], ['Which brands of hobs do you repair?', 'We service all major brands including Glen, Faber, Elica, Sunflame, Prestige, Bosch, Hindware and Kaff.']] },
  { slug: 'uninstall-reinstall', title: 'Uninstallation and Reinstallation', short: 'Safe removal and refitting when you repaint, renovate or move.', image: '/images/service_uninstall.jpg', includes: ['Disconnection and removal', 'Duct and bracket handling', 'Refitting and test'] },
  { slug: 'filter-cleaning', page: true, title: 'Chimney Filter Cleaning', short: 'Deep degreasing of baffle, mesh, and cassette filters for unhindered suction.',
    image: '/images/service_filter.jpg',
    includes: ['Filter removal and hot soak degreasing', 'Carbon filter replacement advice', 'Oil collector cup scrubbing', 'Refitting and airflow suction test'],
    symptoms: ['Oil dripping from filter edges', 'Sticky yellow grease layer on filters', 'Smoke lingering instead of exhausting', 'Rattling filter vibration'],
    intro: 'Blocked chimney filters force the motor to work harder, causing noisy operation and poor smoke capture. We deep-clean and degrease all baffle and cassette filters on site.',
    faqs: [['Can heavily choked baffle filters be revived?', 'Yes. Stainless steel baffle filters respond very well to professional chemical degreasing, restoring full suction.'], ['How long does filter cleaning take?', 'Typically 45 to 60 minutes for thorough filter removal, hot degreasing, and refitting.']] },
  { slug: 'motor-suction', title: 'Motor and Suction Troubleshooting', short: 'Finding why suction is weak or the motor struggles.', image: '/images/service_motor.jpg', includes: ['Motor check', 'Duct blockage check', 'Capacitor and wiring inspection where applicable'] },
  { slug: 'noise-performance', title: 'Noise and Performance Troubleshooting', short: 'Tracking down vibration, rattling and humming.', image: '/images/service_noise.jpg', includes: ['Blade and fixing check', 'Loose part tightening', 'Test run'] }
];
export const problems = [['Chimney not suctioning properly', 'Often a clogged filter or blocked duct.'], ['Excessive noise', 'Loose parts, unbalanced blades or a worn motor.'], ['Oil and grease buildup', 'Grease coats filters and the interior.'], ['Motor problems', 'Humming, slow start or overheating.'], ['Filter blockage', 'Filters saturated with oil restrict airflow.'], ['Chimney not switching on', 'Power, switch or control board issues.']];
export const brands = ['Faber', 'Elica', 'Glen', 'Hindware', 'Kaff', 'Sunflame', 'Inalsa', 'Whirlpool', 'Bosch', 'Cata'];
export const cities = [
  { slug: 'chandigarh', name: 'Chandigarh', image: '/images/city_chandigarh.jpg',
    h1: 'Kitchen Chimney Service in Chandigarh | Repair & Deep Cleaning',
    title: 'Kitchen Chimney Service in Chandigarh | Doorstep Repair & Deep Cleaning',
    desc: 'Doorstep kitchen chimney repair, deep chemical degreasing, filter cleaning, and installation across all Chandigarh sectors (1 to 63 & Maloya). Genuine spares. Call +91 62630 13446.',
    intro: 'Headquartered in Sector 39, Maloya, Chandigarh, our service vans operate daily across all residential and commercial sectors of the city. Whether you have an independent kothi in Sectors 8-36 or a flat in Sectors 40-51, we provide prompt same-day doorstep chimney repair, baffle filter chemical degreasing, and hob service.',
    sectors: ['Sectors 1 to 30', 'Sectors 31 to 47', 'Sectors 48 to 63', 'Sector 39 & Maloya', 'Manimajra', 'Dhanas', 'Sector 8, 9, 10, 11', 'Sector 35, 36, 37, 38'],
    local: ['Apartment kitchens with long duct runs often lose suction gradually.', 'Independent kothis with open kitchens tend to see heavier grease buildup.', 'Many homeowners ask for cleaning before or after painting, festivals, and renovation.'],
    related: ['mohali', 'panchkula', 'zirakpur'],
    faqs: [
      ['Where in Chandigarh are you based?', 'Our central workshop and dispatch base is in Sector 39, Maloya, Chandigarh 160025. Technicians carry spare parts and reach any Chandigarh sector within hours.'],
      ['Which sectors do you cover in Chandigarh?', 'We cover all sectors across Chandigarh (Sectors 1 to 63, Manimajra, and Maloya). Call or WhatsApp for immediate technician availability.'],
      ['Do you service all chimney brands in Chandigarh?', 'Yes, our technicians service Glen, Faber, Elica, Kaff, Hindware, Sunflame, Inalsa, and Whirlpool chimneys.'],
      ['What is the charge for chimney inspection?', 'We provide upfront transparent inspection and quote before starting any work. You only pay after work completion and test run.']
    ]
  },
  { slug: 'mohali', name: 'Mohali (SAS Nagar)', image: '/images/city_mohali.jpg',
    h1: 'Kitchen Chimney Service in Mohali | Repair & Deep Cleaning',
    title: 'Kitchen Chimney Service in Mohali | Doorstep Repair & Deep Cleaning',
    desc: 'Doorstep kitchen chimney repair, deep chemical cleaning, hob repair and installation across Mohali (Phases 1-11, Sectors 66-82, Aerocity). Fast same-day visit. Call +91 62630 13446.',
    intro: 'We serve homes, high-rise societies, and kothis across Mohali daily from our adjacent Chandigarh base. Newer multi-storey society flats in Mohali frequently encounter grease buildup in builder-installed flexible duct pipes, noisy motors, and weak smoke capture that require professional attention.',
    sectors: ['Phases 1 to 11', 'Sectors 66 to 82', 'Aerocity & IT City', 'Sectors 70 & 71', 'Sohana & Landran Rd', 'Purab Premium Apartments', 'Wave Estate & Homeland Heights', 'Sector 78, 79, 80'],
    local: ['Society flats: installation height and duct bends severely impact suction performance.', 'Newly built homes frequently need a brand-new chimney unboxed and fitted properly.', 'Auto-clean chimneys still need periodic filter and oil collector degreasing.'],
    related: ['chandigarh', 'kharar', 'zirakpur'],
    faqs: [
      ['Do you have doorstep technicians available in Mohali?', 'Yes. Our technicians travel to Mohali daily from our adjacent base. We offer same-day morning and evening service slots.'],
      ['Can you install or deep clean a chimney in a new society flat in Mohali?', 'Yes, we regularly service all high-rise societies including Aerocity, Wave Estate, Homeland Heights, Purab Apartments, and Sector 70-80 societies.'],
      ['Can you fix weak suction or motor humming in Mohali?', 'Yes, we test motor bearings, fan blowers, capacitors, and exhaust ducts to restore maximum suction on site.'],
      ['Do you repair gas hobs and stoves in Mohali?', 'Yes, our technicians handle hob repair, burner cleaning, flame adjustment, and gas leakage repairs across Mohali.']
    ]
  },
  { slug: 'kharar', name: 'Kharar', image: '/images/city_kharar.jpg',
    h1: 'Kitchen Chimney Service in Kharar | Repair, Cleaning & Fitting',
    title: 'Kitchen Chimney Service in Kharar | Repair, Cleaning & Fitting',
    desc: 'Professional kitchen chimney repair, chemical degreasing, and installation for Sunny Enclave, Gillco Valley, and Kharar residences. Same-day visit. Call +91 62630 13446.',
    intro: 'Homes in Kharar can easily book chimney repair, deep chemical degreasing, motor replacement, and new unbox installation. We routinely cover major townships like Sunny Enclave, Gillco Valley, and surrounding residential societies with prompt doorstep response.',
    sectors: ['Sunny Enclave', 'Gillco Valley', 'Chajju Majra Road', 'Kharar-Landran Road', 'Model Town', 'Omega City', 'Desumajra', 'Shiva Enclave'],
    local: ['Large family kitchens with daily frying need frequent filter degreasing.', 'Chimneys fitted by builders sometimes sit too high for effective smoke capture.', 'Older chimneys may suffer from capacitor failure or motor humming.'],
    related: ['mohali', 'chandigarh', 'zirakpur'],
    faqs: [
      ['Is chimney service available across Kharar?', 'Yes. We cover Sunny Enclave, Gillco Valley, Chajju Majra Road, and all residential societies across Kharar.'],
      ['What should I share when booking chimney repair in Kharar?', 'Please mention your chimney brand, your exact area or society in Kharar, and what problem you are facing (cleaning, no power, low suction, noise).'],
      ['Do you replace damaged duct pipes in Kharar?', 'Yes, we carry durable flexible aluminum and PVC duct pipes suitable for apartment duct outlets.']
    ]
  },
  { slug: 'zirakpur', name: 'Zirakpur', image: '/images/city_zirakpur.jpg',
    h1: 'Kitchen Chimney Service in Zirakpur | Cleaning, Repair & Ducting',
    title: 'Kitchen Chimney Service in Zirakpur | Cleaning, Repair & Ducting',
    desc: 'Kitchen chimney cleaning, motor repair, duct fitting, and hob repair for societies on VIP Road, Baltana, Dhakoli, and Peer Muchalla. Same-day visit. Call +91 62630 13446.',
    intro: 'Zirakpur is home to dozens of large gated communities and high-rise apartments. We take chimney service requests across VIP Road, Baltana, Dhakoli, and Peer Muchalla with flexible morning and evening visit timings, resolving blocked ducts, motor faults, and dripping grease.',
    sectors: ['VIP Road Societies', 'Dhakoli', 'Baltana', 'Peer Muchalla', 'Gazipur', 'Ambala Highway Towers', 'Maya Garden & Savitry Greens', 'Patiala Road Societies'],
    local: ['Societies with standard builders\' duct fittings often experience duct oil leakage.', 'Busy households see heavy grease accumulate on baffle filters within months.', 'Shifting flats in Zirakpur? We provide safe uninstallation and reinstallation.'],
    related: ['chandigarh', 'mohali', 'panchkula'],
    faqs: [
      ['Can you service chimneys in gated societies on VIP Road?', 'Yes, our technicians frequently visit Maya Garden, Savitry Greens, Motia Blue Ridge, Hollywood Heights, and other societies across Zirakpur.'],
      ['Do you do uninstallation and reinstallation for shifting in Zirakpur?', 'Yes, we safely dismount your chimney, remove duct brackets, and reinstall it securely at your new apartment.'],
      ['How do you clean grease dripping from the chimney?', 'We dismantle baffle filters, degrease the blower impeller, sanitize the oil collection tray, and wipe down the stainless steel casing on site.']
    ]
  },
  { slug: 'panchkula', name: 'Panchkula', image: '/images/city_panchkula.jpg',
    h1: 'Kitchen Chimney Service in Panchkula | Repair & Cleaning',
    title: 'Kitchen Chimney Service in Panchkula | Doorstep Repair & Deep Cleaning',
    desc: 'Fast chimney repair, motor troubleshooting, baffle filter degreasing, and installation across Panchkula sectors and MDC. Upfront pricing & genuine spares. Call +91 62630 13446.',
    intro: 'Panchkula is located just minutes from our base. We handle chimney motor repair, switch replacements, deep baffle degreasing, and new installations for independent houses and flats across all Panchkula sectors, Mansa Devi Complex, and surrounding localities.',
    sectors: ['Sectors 1 to 15', 'Sectors 20 & 21', 'MDC (Mansa Devi Complex)', 'Sectors 25 to 28', 'Pinjore-Kalka Belt', 'Sector 4 & 5', 'Industrial Area Phase 1 & 2', 'Sector 12 & 14'],
    local: ['Larger kothis often have chimneys with extended duct piping that requires airflow clearing.', 'Heavy cooking leads to grease overflowing in oil collector trays.', 'Renovations often call for careful chimney dismounting and refitting.'],
    related: ['chandigarh', 'zirakpur', 'mohali'],
    faqs: [
      ['Do you serve Panchkula in Haryana?', 'Yes, our technicians service Panchkula daily. All sectors, including Sector 20, Sector 21, and Mansa Devi Complex (MDC), are covered.'],
      ['Can you fix noisy motors or weak suction in Panchkula?', 'Yes, we inspect motor bearings, blower balancing, capacitors, and duct outlets to eliminate noise and restore maximum airflow.'],
      ['Do you service glass-top kitchen hobs in Panchkula?', 'Yes, we repair and service gas hobs, burner flames, and ignition switches across Panchkula.']
    ]
  },
  { slug: 'ludhiana', name: 'Ludhiana', image: '/images/city_ludhiana.jpg',
    h1: 'Kitchen Chimney Service in Ludhiana | Repair, Cleaning & Fitting',
    title: 'Kitchen Chimney Service in Ludhiana | Repair, Cleaning & Fitting',
    desc: 'Scheduled doorstep kitchen chimney repair, deep chemical degreasing, and installation across Ludhiana (Model Town, Sarabha Nagar, BRS Nagar). Call +91 62630 13446.',
    intro: 'We provide scheduled chimney service, deep chemical degreasing, and installation for residences across Ludhiana. Appointments are confirmed in advance with clear timing and dedicated technician dispatch with compatible spares.',
    sectors: ['Model Town', 'Sarabha Nagar', 'BRS Nagar', 'Civil Lines', 'Pakhowal Road', 'Ferozepur Road', 'Dugri', 'South City'],
    local: ['Availability and timing are confirmed per request.', 'Describe the problem and chimney brand when you call so we bring exact parts.', 'Doorstep service with test run before payment.'],
    related: ['chandigarh', 'mohali', 'kharar'],
    faqs: [
      ['How do I book chimney service in Ludhiana?', 'Contact us via phone or WhatsApp (+91 62630 13446) with your location in Ludhiana and we will confirm our scheduled technician slot.'],
      ['Do you carry spare parts to Ludhiana?', 'Yes, we confirm your chimney model and brand in advance so our technician arrives with compatible motors, filters, and switches.']
    ]
  }
];
export const homeFaqs = [
  ['Which areas in Tricity do you cover for doorstep service?', 'We provide doorstep kitchen chimney and hob service across Chandigarh, Mohali, Kharar, Zirakpur, Panchkula and scheduled routes to Ludhiana.'],
  ['Do you service all chimney brands?', 'Yes. Our experienced technicians service Glen, Faber, Elica, Hindware, Kaff, Sunflame, Inalsa, Whirlpool, Bosch and other major brands.'],
  ['How much time does chimney deep cleaning take?', 'A comprehensive deep cleaning and chemical degreasing typically takes 45 to 60 minutes right at your home.'],
  ['What are your working hours and response time?', 'We are available 7 days a week, Monday through Sunday, from 8:00 AM to 8:00 PM. For emergency issues like gas leakage or dead motors, same-day visits are prioritized.'],
  ['How do I book an appointment?', 'You can tap Call Now (+91 62630 13446), send a WhatsApp message, or submit the online enquiry form. We confirm technician arrival promptly.']
];
