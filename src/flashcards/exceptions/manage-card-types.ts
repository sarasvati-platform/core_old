import { SarasvatiError } from '@src/core/exceptions'

class UnableToAddFieldError extends SarasvatiError {}
class UnableToRenameFieldError extends SarasvatiError {}

export { UnableToAddFieldError, UnableToRenameFieldError }
