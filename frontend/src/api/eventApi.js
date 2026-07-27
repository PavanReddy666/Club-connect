import api from './axios'
export const getAllEvents = () => api.get('/events')
export const getClubEvents = clubId => api.get(`/clubs/${clubId}/events`)
export const createEvent = (clubId, d) => api.post(`/clubs/${clubId}/events`, d)
export const updateEvent = (id, d) => api.put(`/events/${id}`, d)
export const deleteEvent = id => api.delete(`/events/${id}`)
