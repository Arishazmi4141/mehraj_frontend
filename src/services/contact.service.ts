import { requestAPI } from '../lib/api-client';
import { ContactUsRequest, ContactUsResponse } from '@/src/types/contact';

export const contactService = {
  submitContactUs: (payload: ContactUsRequest): Promise<ContactUsResponse> => {
    return requestAPI<ContactUsResponse>('/contactus/submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, true);
  }
};