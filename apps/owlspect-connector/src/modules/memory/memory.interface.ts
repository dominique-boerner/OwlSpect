import { ApiResponse } from '../../../../shared/models/api-response.interface';
import { Systeminformation } from 'systeminformation';

export type MemoryResponse = ApiResponse<Systeminformation.MemData>;
