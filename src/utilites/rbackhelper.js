export const hasPermission = (user, actions)=>{
    if (!user || !user.role) return false
    return actions.inclkudes(user.role)
}