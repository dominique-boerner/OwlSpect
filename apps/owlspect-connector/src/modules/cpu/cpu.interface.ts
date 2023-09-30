import { ApiResponse } from '../../../../shared/models/api-response.interface';
import { Systeminformation } from 'systeminformation';

export type CpuResponse = ApiResponse<Systeminformation.CpuData>;
