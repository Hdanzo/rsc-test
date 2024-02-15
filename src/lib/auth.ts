export type Permission = "read" | "create" | "update";

export function hasPermissions(
  userPermissions: Permission[],
  neededPermissions: Permission[]
) {
  return neededPermissions.every((neededPermission) =>
    userPermissions.includes(neededPermission)
  );
}
