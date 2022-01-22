const mongoose = require('mongoose');

const attacksSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  kill_chain_phase: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  'attacker.id': {
    type: String,
    required: true,
  },
  'attacker.ip': {
    type: String,
    required: true,
  },
  'attacker.name': {
    type: String,
    required: true,
  },
  'attacker.port': {
    type: Number,
    required: true,
  },
  'decoy.id': {
    type: Number,
    required: true,
  },
  'decoy.name': {
    type: String,
    required: true,
  },
  'decoy.group': {
    type: String,
    required: true,
  },
  'decoy.ip': {
    type: String,
    required: true,
  },
  'decoy.port': {
    type: Number,
    required: true,
  },
  'decoy.type': {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Info', attacksSchema, 'info');
