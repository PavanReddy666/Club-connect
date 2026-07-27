import api from './axios'
export const getAdminStats = () => api.get('/admin/stats')
export const getAllUsers = () => api.get('/admin/users')
export const deleteUser = id => api.delete(`/admin/users/${id}`)
export const changeUserRole = (id, role) => api.patch(`/admin/users/${id}/role`, { role })
