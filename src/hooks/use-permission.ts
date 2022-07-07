import { LoginModule } from "../stores/login/login";

export function usePermission(pageName: string, hanldeName: string) {
  const loginStore = LoginModule();
  const permissions = loginStore.permissions;
  const verifyPermission = `system:${pageName}:${hanldeName}`;

  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission);
}
