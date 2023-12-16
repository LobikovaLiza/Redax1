export const selectUser = (store) => store.user.data

export const selectUserId = (store) => store.user.data?.id

export const selectUserEmail = (store) => store.user.data?.email

export const selectLoading = (store) => store.user.loading