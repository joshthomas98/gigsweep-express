const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  artist_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  bio: { type: String },
  summary: { type: String },
  genre: {
    type: String,
    enum: [
      "Rock",
      "Pop",
      "Jazz",
      "Country",
      "Hip Hop",
      "R&B",
      "Electronic",
      "Classical",
      "Reggae",
      "Metal",
      "Folk",
      "Blues",
      "World Music",
    ],
    required: true,
  },
  country: {
    type: String,
    enum: ["England", "Wales", "Scotland", "Northern Ireland"],
    required: true,
  },
  county: {
    type: String,
    enum: [
      // England counties
      "Bedfordshire",
      "Berkshire",
      "Bristol",
      "Buckinghamshire",
      "Cambridgeshire",
      "Cheshire",
      "Cornwall",
      "Cumbria",
      "Derbyshire",
      "Devon",
      "Dorset",
      "Durham",
      "East Sussex",
      "Essex",
      "Gloucestershire",
      "Greater London",
      "Greater Manchester",
      "Hampshire",
      "Herefordshire",
      "Hertfordshire",
      "Isle of Wight",
      "Kent",
      "Lancashire",
      "Leicestershire",
      "Lincolnshire",
      "Merseyside",
      "Norfolk",
      "North Yorkshire",
      "Northamptonshire",
      "Northumberland",
      "Nottinghamshire",
      "Oxfordshire",
      "Rutland",
      "Shropshire",
      "Somerset",
      "South Yorkshire",
      "Staffordshire",
      "Suffolk",
      "Surrey",
      "Tyne and Wear",
      "Warwickshire",
      "West Midlands",
      "West Sussex",
      "West Yorkshire",
      "Wiltshire",
      "Worcestershire",
      // Wales counties
      "Blaenau Gwent",
      "Bridgend",
      "Caerphilly",
      "Cardiff",
      "Carmarthenshire",
      "Ceredigion",
      "Conwy",
      "Denbighshire",
      "Flintshire",
      "Gwynedd",
      "Isle of Anglesey",
      "Merthyr Tydfil",
      "Monmouthshire",
      "Neath Port Talbot",
      "Newport",
      "Pembrokeshire",
      "Powys",
      "Rhondda Cynon Taff",
      "Swansea",
      "Torfaen",
      "Vale of Glamorgan",
      "Wrexham",
      // Scotland counties
      "Aberdeen City",
      "Aberdeenshire",
      "Angus",
      "Argyll and Bute",
      "Clackmannanshire",
      "Dumfries and Galloway",
      "Dundee City",
      "East Ayrshire",
      "East Dunbartonshire",
      "East Lothian",
      "East Renfrewshire",
      "Edinburgh",
      "Falkirk",
      "Fife",
      "Glasgow",
      "Highland",
      "Inverclyde",
      "Midlothian",
      "Moray",
      "Na h-Eileanan Siar",
      "North Ayrshire",
      "North Lanarkshire",
      "Orkney Islands",
      "Perth and Kinross",
      "Renfrewshire",
      "Scottish Borders",
      "Shetland Islands",
      "South Ayrshire",
      "South Lanarkshire",
      "Stirling",
      "West Dunbartonshire",
      "West Lothian",
      // Northern Ireland counties
      "Antrim",
      "Armagh",
      "Down",
      "Fermanagh",
      "Londonderry",
      "Tyrone",
    ],
    required: true,
  },
  type_of_artist: {
    type: String,
    enum: ["Full band", "Solo artist", "Duo"],
    required: true,
  },
  user_type: {
    type: String,
    enum: ["Artist", "Venue"],
    required: true,
  },
  image: { type: String },
  featured_artist: { type: Boolean, default: false },
  facebook: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  artist_membership_type: { type: Number, required: true },
  upcoming_gigs: [{ type: Schema.Types.Mixed }],
  gigging_distance: [{ type: String }],
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;
