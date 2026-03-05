require('dotenv').config();
const db = require('./config/database');

const places = [
  {
    name: "Nandi Hills",
    description: "Nandi Hills, also known as Nandidurga, is a hill fortress in Chikkaballapur district, approximately 60 km from Bengaluru. Rising to an elevation of 1,478 meters above sea level, it offers breathtaking panoramic views of the surrounding countryside. The hills are a popular weekend getaway for residents of Bengaluru, especially famous for stunning sunrise views that attract thousands of visitors. The area features ancient temples, a fort built by Hyder Ali and Tipu Sultan, lush greenery, and trekking trails. Paragliding is a popular adventure activity here, and the morning mist creates a magical atmosphere making it one of Karnataka's most visited destinations.",
    location: "Nandi Hills, Chikkaballapur",
    city: "Chikkaballapur",
    district: "Chikkaballapur",
    category: "Hill Stations & Nature",
    rating: 4.5,
    num_reviews: 12543,
    price: 800,
    entry_fee: "₹20 per person",
    timings: "6:00 AM - 6:00 PM",
    best_time: "October to February",
    how_to_reach: "60 km from Bengaluru via NH44. Regular KSRTC buses from Bengaluru. Taxis and private vehicles available.",
    latitude: 13.3702,
    longitude: 77.6835,
    image_url: "https://images.unsplash.com/photo-1626015356580-c4a61a0f7b73?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800"
    ]),
    highlights: JSON.stringify(["Sunrise views", "Trekking trails", "Paragliding", "Ancient fort", "Tipu Sultan's summer retreat"])
  },
  {
    name: "Mysore Palace",
    description: "The Mysore Palace, officially known as Mysore Palace (Amba Vilas), is a historical palace and royal residence located in Mysuru, Karnataka. It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore. The palace was built between 1897 and 1912 in the Indo-Saracenic style. The palace houses two durbar halls and is surrounded by a large garden. The illumination of the palace with nearly 97,000 light bulbs during Dasara festivities and on Sunday evenings makes it one of the most visited monuments in India, receiving more than 6 million visitors annually.",
    location: "Sayyaji Rao Road, Mysuru",
    city: "Mysuru",
    district: "Mysuru",
    category: "Palaces & Heritage",
    rating: 4.7,
    num_reviews: 45678,
    price: 500,
    entry_fee: "₹50 per person (Indians), ₹200 (Foreigners)",
    timings: "10:00 AM - 5:30 PM (All days)",
    best_time: "October (Dasara Festival)",
    how_to_reach: "3 km from Mysuru railway station. Auto-rickshaws, buses and taxis available from the station.",
    latitude: 12.3052,
    longitude: 76.6552,
    image_url: "https://images.unsplash.com/photo-1600693406636-d2bc70b26d8d?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
      "https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=800",
      "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=800"
    ]),
    highlights: JSON.stringify(["Indo-Saracenic architecture", "97,000 bulb illumination", "Golden throne", "Dasara celebrations", "Royal museum"])
  },
  {
    name: "Mysore Zoo",
    description: "Mysore Zoo, officially known as Sri Chamarajendra Zoological Gardens, is one of the oldest and largest zoos in India, established in 1892. Spread over 157 acres, it houses more than 1,450 animals belonging to 168 species. The zoo is known for its well-maintained animal enclosures, lush green landscape, and successful animal breeding programs. It is home to rare species like gorillas, white tigers, and white peacocks. The zoo also has a children's park, toy train, and butterfly park within its premises. It is administered by the Karnataka Zoo Authority and consistently ranks as one of the best-managed zoos in Asia.",
    location: "Indira Gandhi Road, Mysuru",
    city: "Mysuru",
    district: "Mysuru",
    category: "Wildlife & Parks",
    rating: 4.4,
    num_reviews: 23456,
    price: 300,
    entry_fee: "₹60 per person (Adults), ₹30 (Children)",
    timings: "8:30 AM - 5:30 PM (Closed Tuesdays)",
    best_time: "October to March",
    how_to_reach: "Located near Mysore Palace. 2 km from Mysuru railway station. Auto-rickshaws and buses available.",
    latitude: 12.3019,
    longitude: 76.6570,
    image_url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800",
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800"
    ]),
    highlights: JSON.stringify(["168 species", "White tigers", "Butterfly park", "Toy train", "Breeding programs"])
  },
  {
    name: "Chamundeshwari Temple",
    description: "Sri Chamundeshwari Temple is a Hindu temple situated atop the Chamundi Hills, about 13 km from Mysuru city. The temple is dedicated to Chamundeshwari (Durga), the fierce form of Shakti, and is the tutelary deity of the Mysore Maharajas. The temple complex includes a 40-meter high gopuram (tower) and a large statue of Nandi (holy bull) carved out of a single rock. Devotees climb 1,000 stone steps to reach the temple, passing by the Nandi statue on the way. The temple offers spectacular views of Mysuru city and the surrounding countryside. It is one of the 18 Mahashakti Peethas and attracts lakhs of pilgrims annually.",
    location: "Chamundi Hills, Mysuru",
    city: "Mysuru",
    district: "Mysuru",
    category: "Temples & Spiritual",
    rating: 4.5,
    num_reviews: 34567,
    price: 200,
    entry_fee: "Free (Special darshan: ₹50)",
    timings: "7:30 AM - 2:00 PM, 3:30 PM - 6:00 PM, 7:30 PM - 9:00 PM",
    best_time: "October (Navratri/Dasara)",
    how_to_reach: "13 km from Mysuru city center. Regular buses from Mysuru city bus stand. Taxis and auto-rickshaws available.",
    latitude: 12.2720,
    longitude: 76.6743,
    image_url: "https://images.unsplash.com/photo-1609507422733-bf6d6e27f54e?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      "https://images.unsplash.com/photo-1592037943698-c83f3c72d02c?w=800"
    ]),
    highlights: JSON.stringify(["1000 stone steps", "Nandi statue", "Panoramic views of Mysuru", "Shakti Peetha", "Dasara celebrations"])
  },
  {
    name: "Virupaksha Temple",
    description: "The Virupaksha Temple at Hampi is one of the oldest functioning temples in India, dating back to the 7th century. It is dedicated to Lord Shiva (Virupaksha) and is part of the Group of Monuments at Hampi, which is a UNESCO World Heritage Site. The temple complex includes an impressive 50-meter high gopuram at the entrance, multiple mandapas (halls), and a sacred water tank. The temple was the main center of Hindu worship during the glorious Vijayanagara Empire period (14th-16th centuries). The surrounding ruins of the vast Vijayanagara Empire stretch across a surreal boulder-strewn landscape along the Tungabhadra River, creating one of the most dramatic archaeological sites in the world.",
    location: "Hampi, Ballari District",
    city: "Hampi",
    district: "Ballari",
    category: "Temples & Spiritual",
    rating: 4.8,
    num_reviews: 28901,
    price: 1000,
    entry_fee: "₹40 per person (Indians), ₹600 (Foreigners)",
    timings: "6:00 AM - 6:00 PM",
    best_time: "October to March",
    how_to_reach: "350 km from Bengaluru. Nearest railway station is Hospet (13 km). Regular buses from Bengaluru, Hubli and Hospet.",
    latitude: 15.3350,
    longitude: 76.4600,
    image_url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1600693406636-d2bc70b26d8d?w=800"
    ]),
    highlights: JSON.stringify(["UNESCO World Heritage", "7th century temple", "Vijayanagara Empire ruins", "50m gopuram", "Tungabhadra River views"])
  },
  {
    name: "Jog Falls",
    description: "Jog Falls is the second highest plunge waterfall in India, with a height of 253 meters (830 feet). Located in Sagara taluk of Shivamogga district, the falls are created by the Sharavathi River plunging over a rocky cliff. The falls have four distinct cascades: Raja, Rani, Rover, and Rocket, each with its own character. The Raja fall is the most prominent and most photographed. The best time to visit is between August and December when the falls are at their fullest and most spectacular. The surrounding region is part of a wildlife sanctuary and offers trekking opportunities. A newly developed tourist complex with viewing platforms, a ropeway, and amenities has been built to enhance the visitor experience.",
    location: "Sagara, Shivamogga",
    city: "Sagara",
    district: "Shivamogga",
    category: "Beaches & Waterfalls",
    rating: 4.6,
    num_reviews: 18765,
    price: 600,
    entry_fee: "₹20 per person",
    timings: "8:00 AM - 6:00 PM",
    best_time: "August to December",
    how_to_reach: "400 km from Bengaluru via NH206. Nearest railway station is Talguppa (16 km). Buses from Shimoga and Sirsi.",
    latitude: 14.2271,
    longitude: 74.7863,
    image_url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
      "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=800"
    ]),
    highlights: JSON.stringify(["253m height", "4 cascades", "Ropeway facility", "Wildlife sanctuary", "Photography spot"])
  },
  {
    name: "Coorg (Madikeri)",
    description: "Coorg, officially known as Kodagu, is a hilly district in the Western Ghats of Karnataka, often called the 'Scotland of India'. It is famous for its lush coffee and tea plantations, misty hills, cascading waterfalls, and the brave Kodava people. The main town Madikeri offers attractions like Raja's Seat, Madikeri Fort, Omkareshwara Temple, and Abbey Falls. The region's pleasant climate throughout the year makes it a sought-after tourist destination. Activities include coffee plantation tours, trekking, river rafting, camping, and bird watching. The local Kodava cuisine, especially pandi curry (pork curry) and kadambuttu (rice dumplings), is a unique culinary experience.",
    location: "Madikeri, Kodagu",
    city: "Madikeri",
    district: "Kodagu",
    category: "Hill Stations & Nature",
    rating: 4.7,
    num_reviews: 38921,
    price: 2500,
    entry_fee: "Free (individual attractions vary)",
    timings: "Open all day",
    best_time: "October to March",
    how_to_reach: "265 km from Bengaluru via Mysuru. Regular KSRTC luxury buses from Bengaluru and Mysuru. Nearest airport is Mangalore (135 km).",
    latitude: 12.4244,
    longitude: 75.7382,
    image_url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
    ]),
    highlights: JSON.stringify(["Coffee plantations", "Abbey Falls", "Raja's Seat", "Misty hills", "Kodava culture"])
  },
  {
    name: "Gokarna Beach",
    description: "Gokarna is a small temple town on the western coast of Karnataka, famous for its pristine beaches and the ancient Mahabaleshwara Temple. Unlike crowded Goa beaches, Gokarna offers a more peaceful and authentic experience. The town has five beautiful beaches: Town Beach, Kudle Beach, Om Beach (shaped like the Om symbol), Half Moon Beach, and Paradise Beach. Om Beach is the most popular, known for its distinctive shape and clear waters. The town is also an important Hindu pilgrimage center, housing the Atmalinga (the sacred linga) in the Mahabaleshwara Temple. Visitors can trek between beaches along scenic coastal paths with stunning Arabian Sea views.",
    location: "Gokarna, Uttara Kannada",
    city: "Gokarna",
    district: "Uttara Kannada",
    category: "Beaches & Waterfalls",
    rating: 4.5,
    num_reviews: 22341,
    price: 1500,
    entry_fee: "Free",
    timings: "Open all day",
    best_time: "October to March",
    how_to_reach: "483 km from Bengaluru. Nearest railway station is Gokarna Road (10 km). Regular buses from Mangalore, Hubli and Bengaluru.",
    latitude: 14.5479,
    longitude: 74.3188,
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800"
    ]),
    highlights: JSON.stringify(["Om Beach", "Half Moon Beach", "Mahabaleshwara Temple", "Beach trekking", "Coastal views"])
  },
  {
    name: "Bannerghatta National Park",
    description: "Bannerghatta National Park is a protected area located about 22 km south of Bengaluru city. Established in 1974, it spans 104 square kilometers and is part of the Elephant Reserve project. The park is famous for its wildlife safari (offering sightings of tigers, lions, elephants, bears, and deer), a zoo, a rescue center for injured animals, and the largest butterfly enclosure in India. The Butterfly Park houses over 20 species of butterflies in a large enclosed area with carefully maintained vegetation. The park also has a Crocodile Farm and a Fish Aquarium. It is an ideal destination for a day trip from Bengaluru, especially for families with children.",
    location: "Bannerghatta, Bengaluru",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    category: "Wildlife & Parks",
    rating: 4.3,
    num_reviews: 31245,
    price: 500,
    entry_fee: "₹80 per person (Safari: ₹250-450 extra)",
    timings: "9:30 AM - 5:00 PM (Closed Tuesdays)",
    best_time: "November to February",
    how_to_reach: "22 km from Bengaluru city center. BMTC bus routes available. Taxis and cabs from Bengaluru.",
    latitude: 12.8001,
    longitude: 77.5760,
    image_url: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800",
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
      "https://images.unsplash.com/photo-1518715303843-586e350756a8?w=800"
    ]),
    highlights: JSON.stringify(["Wildlife safari", "Tiger & lion sightings", "Butterfly Park", "Rescue center", "Near Bengaluru"])
  },
  {
    name: "Lalbagh Botanical Garden",
    description: "Lalbagh Botanical Garden is one of the most important botanical gardens in India, located in the heart of Bengaluru. Spread over 240 acres, it was originally laid out in 1760 by Hyder Ali and later expanded by Tipu Sultan. The garden houses more than 1,000 species of plants from around the world, including a collection of tropical plants, medicinal plants, and rare ornamental trees. The iconic Glass House, built in 1889 inspired by London's Crystal Palace, hosts famous flower shows twice a year. Other highlights include the Kempegowda tower, a large lake with migratory birds, the rose garden, and a bonsai garden. It is a UNESCO Heritage Garden and serves as a lung space for the city.",
    location: "Lalbagh, Bengaluru",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    category: "Hill Stations & Nature",
    rating: 4.4,
    num_reviews: 42156,
    price: 200,
    entry_fee: "₹25 per person (Adults), ₹10 (Children)",
    timings: "6:00 AM - 7:00 PM (All days)",
    best_time: "January-February (Republic Day Flower Show)",
    how_to_reach: "Located in central Bengaluru, 3 km from Bengaluru City railway station. BMTC buses, metro and auto-rickshaws available.",
    latitude: 12.9507,
    longitude: 77.5848,
    image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1465311354990-ef01fad17a95?w=800",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800"
    ]),
    highlights: JSON.stringify(["Glass House", "1000+ plant species", "Flower shows", "Kempegowda Tower", "UNESCO Heritage"])
  },
  {
    name: "Badami Cave Temples",
    description: "The Badami Cave Temples are a complex of Hindu and Jain cave temples carved out of the Badami sandstone cliffs in the 6th century CE by the Chalukya dynasty. Located in Bagalkot district, there are four rock-cut temples: the first three dedicated to Hinduism (Shiva and Vishnu) and the fourth to Jainism. The temples are renowned for their exquisite sculptural work including remarkable carvings of deities like Nataraja (dancing Shiva with 18 arms), Harihara, and Trivikrama. The archaeological site also includes Bhutanatha temples along an agastya lake and Badami Fort offering panoramic views of the red sandstone gorge. The natural setting of red sandstone cliffs reflected in a tranquil lake creates a dramatic and picturesque landscape.",
    location: "Badami, Bagalkot",
    city: "Badami",
    district: "Bagalkot",
    category: "Palaces & Heritage",
    rating: 4.5,
    num_reviews: 15678,
    price: 800,
    entry_fee: "₹25 per person (Indians), ₹300 (Foreigners)",
    timings: "6:00 AM - 6:00 PM",
    best_time: "October to March",
    how_to_reach: "500 km from Bengaluru. Nearest railway station is Badami (1 km). Buses from Hubli (105 km) and Bijapur (130 km).",
    latitude: 15.9151,
    longitude: 75.6781,
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1609507422733-bf6d6e27f54e?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800"
    ]),
    highlights: JSON.stringify(["6th century rock-cut temples", "Chalukya dynasty", "18-arm Nataraja carving", "Sandstone gorge", "Agastya Lake"])
  },
  {
    name: "Murudeshwar Temple",
    description: "Murudeshwar is a town in Uttara Kannada district of Karnataka, famous for the Murudeshwar Temple dedicated to Lord Shiva. The temple complex is home to the world's second-tallest statue of Lord Shiva, standing 123 feet tall, overlooking the Arabian Sea. The 20-story gopuram (temple tower) with a lift for visitors offers spectacular 360-degree views of the Arabian Sea. The temple itself is built on the Kanduka Hill, surrounded by the sea on three sides, making it one of the most beautifully located Hindu temples in India. According to legend, the original Atmalinga brought by Ravana was cut into pieces, and one piece fell here, making it a significant pilgrimage site. The nearby beach and marine life adds to the tourism appeal.",
    location: "Murudeshwar, Uttara Kannada",
    city: "Murudeshwar",
    district: "Uttara Kannada",
    category: "Temples & Spiritual",
    rating: 4.6,
    num_reviews: 19876,
    price: 500,
    entry_fee: "Free (Gopuram lift: ₹5)",
    timings: "6:00 AM - 8:30 PM",
    best_time: "October to March",
    how_to_reach: "484 km from Bengaluru. Murudeshwar has its own railway station. Buses from Mangalore (165 km) and Hubli.",
    latitude: 14.0944,
    longitude: 74.1046,
    image_url: "https://images.unsplash.com/photo-1592037943698-c83f3c72d02c?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    ]),
    highlights: JSON.stringify(["123ft Shiva statue (2nd tallest)", "Arabian Sea views", "20-story gopuram with lift", "Kanduka Hill location", "Atmalinga legend"])
  },
  {
    name: "Sringeri Sharada Peetham",
    description: "Sringeri Sharada Peetham is one of the four cardinal mathas (monasteries) established by the philosopher-saint Adi Shankaracharya in the 8th century CE. Located on the banks of the Tunga river in Chikmagalur district, it is the southern matha among the four. The complex includes the famous Sharadamba Temple, dedicated to the goddess Sharada (Saraswati), a magnificent golden deity. The Vidyashankara Temple built in 1338 CE is an architectural marvel with 12 pillars corresponding to the 12 zodiac signs, aligned so that sunlight falls on each zodiac stone in the respective month. The serene forest setting on the banks of the crystal-clear Tunga river and the spiritual atmosphere make it a deeply peaceful destination.",
    location: "Sringeri, Chikmagalur",
    city: "Sringeri",
    district: "Chikmagalur",
    category: "Temples & Spiritual",
    rating: 4.7,
    num_reviews: 23456,
    price: 300,
    entry_fee: "Free",
    timings: "7:00 AM - 2:00 PM, 4:00 PM - 8:00 PM",
    best_time: "September to March",
    how_to_reach: "385 km from Bengaluru. No direct trains. Regular buses from Chikmagalur (64 km), Mangalore (100 km) and Bengaluru.",
    latitude: 13.4190,
    longitude: 75.2524,
    image_url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1609507422733-bf6d6e27f54e?w=800",
      "https://images.unsplash.com/photo-1592037943698-c83f3c72d02c?w=800",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
    ]),
    highlights: JSON.stringify(["Adi Shankaracharya matha", "Sharadamba Temple", "Vidyashankara Temple", "Tunga river", "Zodiac pillars"])
  },
  {
    name: "Kabini Wildlife Sanctuary",
    description: "Kabini Wildlife Sanctuary is part of the Nagarhole National Park and Tiger Reserve, located at the border of Mysuru and Kodagu districts. The sanctuary is named after the Kabini River (a tributary of Cauvery), which forms its northern boundary. It is one of the best places in India to spot tigers, leopards, and the famous Kabini black panther. The river also attracts large herds of elephants, especially at the end of summer when they congregate near the water. Boat safaris on the Kabini reservoir offer unique wildlife viewing experiences, and jeep safaris provide thrilling encounters with various animals. Kabini is also home to rich birdlife and diverse flora.",
    location: "HD Kote, Mysuru",
    city: "HD Kote",
    district: "Mysuru",
    category: "Wildlife & Parks",
    rating: 4.6,
    num_reviews: 17654,
    price: 3000,
    entry_fee: "₹300 per person (Safari: ₹700-2500)",
    timings: "Safari: 6:00 AM - 9:00 AM, 3:30 PM - 6:30 PM",
    best_time: "October to May (Best: March-June for elephant gatherings)",
    how_to_reach: "220 km from Bengaluru. 65 km from Mysuru. No direct trains. Buses from Mysuru to HD Kote. Taxis from Mysuru.",
    latitude: 11.9387,
    longitude: 76.4143,
    image_url: "https://images.unsplash.com/photo-1518715303843-586e350756a8?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800"
    ]),
    highlights: JSON.stringify(["Tiger sightings", "Black panther", "Elephant herds", "Boat safari", "Jeep safari"])
  },
  {
    name: "Talakadu",
    description: "Talakadu is an ancient town on the eastern bank of the Cauvery River in Mysuru district, famous for its unique landscape of 30+ ancient temples buried under sand dunes. The town has great historical and religious significance, as it was the capital of the Western Ganga dynasty from the 4th to 11th centuries CE. Due to a legend involving a curse, the town is believed to have been buried under sand. The main attraction is the Panchalinga Darshana, when the Cauvery flood waters recede every 12 years (Makaravilaku), exposing five Shiva lingas. The site features ancient temples like Vaidyeshwara Temple, Keerthinarayana Temple, and Maruleshwara Temple. The mysterious sand dunes amidst the jungle setting create an eerie yet fascinating atmosphere.",
    location: "Talakadu, Mysuru",
    city: "Talakadu",
    district: "Mysuru",
    category: "Temples & Spiritual",
    rating: 4.3,
    num_reviews: 11234,
    price: 400,
    entry_fee: "Free",
    timings: "6:00 AM - 6:00 PM",
    best_time: "October to March",
    how_to_reach: "45 km from Mysuru via T Narasipura. Regular buses from Mysuru. Nearest railway station is Mysuru.",
    latitude: 12.2004,
    longitude: 77.0425,
    image_url: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800"
    ]),
    highlights: JSON.stringify(["30+ buried temples", "Sand dunes mystery", "Panchalinga Darshana", "Cauvery riverbank", "Ancient capital"])
  },
  {
    name: "Adiyogi Shiva Statue",
    description: "The Adiyogi Shiva Statue is a 112-foot (34-meter) steel sculpture of the face of Adiyogi, the first yogi, located at the Isha Yoga Center in Coimbatore. Karnataka has its own significant Adiyogi connection near Nandi Hills. The statue was inaugurated by Prime Minister Narendra Modi on February 24, 2017, and is recognized by Guinness World Records as the largest bust sculpture in the world. The surrounding Isha Yoga Center, spread over 150 acres of lush forest at the Velliangiri foothills, offers meditation programs, yoga classes, and spiritual retreats. The evening laser show at the statue is a mesmerizing experience drawing visitors from across India and the world.",
    location: "Isha Yoga Center, Chikkaballapur",
    city: "Chikkaballapur",
    district: "Chikkaballapur",
    category: "Temples & Spiritual",
    rating: 4.6,
    num_reviews: 25678,
    price: 300,
    entry_fee: "Free",
    timings: "6:00 AM - 8:00 PM",
    best_time: "October to March",
    how_to_reach: "Near Nandi Hills, 60 km from Bengaluru. Auto-rickshaws and cabs from Chikkaballapur.",
    latitude: 11.0346,
    longitude: 76.9333,
    image_url: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
    gallery_images: JSON.stringify([
      "https://images.unsplash.com/photo-1609507422733-bf6d6e27f54e?w=800",
      "https://images.unsplash.com/photo-1592037943698-c83f3c72d02c?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800"
    ]),
    highlights: JSON.stringify(["112-ft Adiyogi statue", "Guinness World Record", "Evening laser show", "Meditation programs", "Yoga center"])
  }
];

const insert = db.prepare(`
  INSERT INTO places (
    name, description, location, city, district, category,
    rating, num_reviews, price, entry_fee, timings, best_time,
    how_to_reach, latitude, longitude, image_url, gallery_images, highlights
  ) VALUES (
    @name, @description, @location, @city, @district, @category,
    @rating, @num_reviews, @price, @entry_fee, @timings, @best_time,
    @how_to_reach, @latitude, @longitude, @image_url, @gallery_images, @highlights
  )
`);

const seedAll = db.transaction((rows) => {
  // Clear existing places before seeding
  db.prepare('DELETE FROM places').run();
  for (const row of rows) {
    insert.run(row);
  }
});

seedAll(places);
console.log(`Seeded ${places.length} places successfully.`);
