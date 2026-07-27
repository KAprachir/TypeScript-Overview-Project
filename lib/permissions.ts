type Role = 'admin' | 'user' | 'guest'

const rolePermissions: Record<Role, string[]> = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
}

function hasPermission (role: Role, action: string): boolean {
  return rolePermissions[role].includes(action)
}

console.log(hasPermission('guest', 'delete')) // false
console.log(hasPermission('admin', 'delete')) // true
