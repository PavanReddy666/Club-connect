import api from './axios'
export const applyToClub = (clubId, d) => api.post(`/clubs/${clubId}/apply`, d)
export const getMyApplications = () => api.get('/student/applications')
export const getCoordinatorApplications = () => api.get('/coordinator/applications')
export const updateApplicationStatus = (id, status) => api.patch(`/applications/${id}/status`, { status })
