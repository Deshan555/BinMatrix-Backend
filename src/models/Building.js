const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip_code: { type: String, required: true },
});

const GeographicalCoordinatesSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const PrimaryContactSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
});

const EmergencyContactSchema = new Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
});

const SectionUnitSchema = new Schema({
  section_name: { type: String, required: true },
  description: { type: String },
});

const InternetAvailabilitySchema = new Schema({
  type: { type: String, required: true },
  provider: { type: String },
});

const StorageUnitSchema = new Schema({
  unit_name: { type: String, required: true },
  description: { type: String },
});

const PastIncidentSchema = new Schema({
  incident: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

const PreviousModificationSchema = new Schema({
  modification: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

const BuildingSchema = new Schema({
  basic_information: {
    name: { type: String, required: true },
    type: { type: String, enum: ['Building', 'Factory', 'Warehouse'], required: true },
    location: { type: LocationSchema, required: true },
    geographical_coordinates: { type: GeographicalCoordinatesSchema, required: true },
    building_code: { type: String, unique: true, required: true },
  },
  contact_information: {
    primary_contact: { type: PrimaryContactSchema, required: true },
    emergency_contacts: [EmergencyContactSchema],
  },
  building_specifications: {
    floors: { type: Number, required: true },
    total_area: { type: String, required: true },
    sections_units: [SectionUnitSchema],
    operational_hours: { type: String, required: true },
    capacity: { type: Number, required: true },
  },
  utilities_infrastructure: {
    power_source: { type: String, required: true },
    internet_availability: { type: InternetAvailabilitySchema },
    hvac_system: { type: String },
    safety_compliance_certifications: [String],
  },
  asset_information: {
    asset_categories: [String],
    storage_units: [StorageUnitSchema],
    maintenance_requirements: { type: String },
  },
  security_details: {
    access_control: { type: String, required: true },
    surveillance: { type: String },
    alarm_system: { type: String },
  },
  compliance_legal: {
    permits: [String],
    inspection_records: [String],
    insurance_information: {
      provider: { type: String, required: true },
      policy_details: { type: String, required: true },
    },
  },
  operational_management_data: {
    owner_management_company: { type: String, required: true },
    building_manager: { type: String, required: true },
    employee_capacity: { type: Number, required: true },
  },
  historical_data: {
    construction_date: { type: Date, required: true },
    past_incidents: [PastIncidentSchema],
    previous_modifications: [PreviousModificationSchema],
  },
});

module.exports = mongoose.model('Building', BuildingSchema);
