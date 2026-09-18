import {type Hack} from '../types/breach';

export const hacks: Hack[] = [
    { name: 'DTA-MINING_V1', sequence: ['7A', '4F', 'X1'], description: 'Extract data from network.'},
    { name: 'DTA-MINING_V2', sequence: ['1C', 'P5', '1L'], description: 'System shut down operation.'},
    { name: 'DTA-MINING_V3', sequence: ['3E', '9K', 'L0', 'KQ'], description: 'Bypass security protocol.'},
]