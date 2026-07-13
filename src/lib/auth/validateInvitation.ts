export function validateInvitationCode(code: string): boolean {
  const expected = process.env.NEXT_PUBLIC_INVITATION_CODE_PROFESOR;
  if (!expected) return false;
  return code.trim() === expected.trim();
}
