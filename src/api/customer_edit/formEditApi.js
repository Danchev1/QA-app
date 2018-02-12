import Http from '@/classes/http/Http'
import { API_ROOT } from '@/api/config'
import Transform from '@/classes/form/Transform'

export default {
  getCustomerEditForm (profileId) {
    return Http.get({
      base_url: API_ROOT,
      url: `dynamic-form/customer-information/${profileId}`
    })
  },
  patchCustomerInformation (formData, profileId) {
    return Http.patch({
      base_url: API_ROOT,
      url: `dynamic-form/customer-information/${profileId}`,
      data: Transform.createMultipartFormData(formData)
    })
  }
}
