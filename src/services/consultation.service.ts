import { requestAPI } from '../lib/api-client';
import { ConsultationRequest, ConsultationResponse } from '@/src/types/consultation';

export const consultationService = {
  submitConsultation: (payload: ConsultationRequest): Promise<ConsultationResponse> => {
    return requestAPI<ConsultationResponse>('/consultation/submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};