export default function validateEmail(email: string) {
  return email.match(/^\S+@\S+\.\S+$/)
}
