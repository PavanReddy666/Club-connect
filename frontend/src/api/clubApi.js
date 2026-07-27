import api from './axios'
export const getApprovedClubs = () => api.get('/clubs')
export const getAllClubs = () => api.get('/admin/clubs')
export const getClub = id => api.get(`/clubs/${id}`)
export const getMyClubs = () => api.get('/clubs/my')
export const createClub = d => api.post('/clubs', d)
export const updateClub = (id, d) => api.put(`/clubs/${id}`, d)
export const deleteClub = id => api.delete(`/clubs/${id}`)
export const updateClubStatus = (id, status) => api.patch(`/admin/clubs/${id}/status`, { status })
