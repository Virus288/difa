// eslint-disable-next-line max-classes-per-file
export class FullError extends Error {
  code = '000';
  status = 500;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     InternalError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'InternalError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '001'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'Internal error. Try again later'
 */
export class InternalError extends FullError {
  constructor() {
    super('Internal error. Try again later');
    this.name = 'InternalError';
    this.code = '001';
    this.status = 500;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectDataType:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectDataType'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '002'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'Received request is not json type'
 */
export class IncorrectDataType extends FullError {
  constructor() {
    super('Received request is not json type');
    this.name = 'IncorrectDataType';
    this.code = '002';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     MissingArgError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'MissingArgError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '003'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Missing param: .+$"
 */
export class MissingArgError extends FullError {
  constructor(param: string) {
    super(`Missing param: ${param}`);
    this.name = 'MissingArgError';
    this.code = '003';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectArgError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '004'
 *         message:
 *           type: string
 *           description: Error message describing the incorrect parameter.
 *           example: 'Data not provided'
 */
export class IncorrectArgError extends FullError {
  constructor(err: string) {
    super(err);
    this.name = 'IncorrectArgError';
    this.code = '004';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     MissingProcessPlatformError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'MissingProcessPlatformError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '005'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'process.platform is missing'
 */
export class MissingProcessPlatformError extends FullError {
  constructor() {
    super('process.platform is missing');
    this.name = 'MissingProcessPlatformError';
    this.code = '005';
    this.status = 500;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectArgLengthError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgLengthError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '006'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element has incorrect length: .+$"
 */
export class IncorrectArgLengthError extends FullError {
  constructor(target: string, min: number | undefined, max: number) {
    super(
      min === undefined
        ? `${target} should be less than ${max} characters`
        : min !== max
          ? `${target} should be more than ${min} and less than ${max} characters`
          : `${target} should be ${min} characters`,
    );
    this.name = 'IncorrectArgLengthError';
    this.code = '006';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrctArgTypeError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgTypeError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '007'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element has incorrect length: .+$"
 */
export class IncorrectArgTypeError extends FullError {
  constructor(err: string) {
    super(err);
    this.name = 'IncorrectArgTypeError';
    this.code = '007';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     ElementTooShortError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'ElementTooShortError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '008'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element .+$ is too short. Minimum length is .+$"
 */
export class ElementTooShortError extends FullError {
  constructor(target: string, min: number) {
    super(`Element ${target} is too short. Minimum length is ${min}`);
    this.name = 'ElementTooShortError';
    this.code = '008';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     ElementTooLongError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'ElementTooLongError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '009'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element .+$ is too long. Maximum length is .+$"
 */
export class ElementTooLongError extends FullError {
  constructor(target: string, min: number) {
    super(`Element ${target} is too long. Maximum length is ${min}`);
    this.name = 'ElementTooShortLongError';
    this.code = '009';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     NoPermissionError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'NoPermissionError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '010'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'You have no permission to make that action'
 */
export class NoPermissionError extends FullError {
  constructor() {
    super('You have no permission to make that action');
    this.name = 'NoPermission';
    this.code = '010';
    this.status = 401;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UnregisteredControllerError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'UnregisteredControllerError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '011'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'Controllers with target ${target} were not registered !'
 */
export class UnregisteredControllerError extends FullError {
  constructor(target: string) {
    super(`Controllers with target ${target} were not registered !`);
    this.name = 'UnregisteredControllerError';
    this.code = '011';
    this.status = 500;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectBodyTypeError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectBodyTypeError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '012'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: "Incorrect body type. Data should be of type json"
 */
export class IncorrectBodyTypeError extends FullError {
  constructor() {
    super('Incorrect body type. Data should be of type json');
    this.name = 'IncorrectBodyTypeError';
    this.code = '012';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     NoDataProvidedError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'NoDataProvidedError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '013'
 *         message:
 *           example: 'No data provided'
 *           description: Error message describing the incorrect parameter.
 *           type: string
 */
export class NoDataProvidedError extends FullError {
  constructor() {
    super('No data provided');
    this.name = 'NoDataProvidedError';
    this.code = '013';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     FourOhFour:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'FourOhFour'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '014'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: "Resource not found or is inaccessible for you"
 */
export class FourOhFour extends FullError {
  constructor() {
    super('Resource not found or is inaccessible for you');
    this.name = 'FourOhFour';
    this.code = '014';
    this.status = 404;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     FourOhFour:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'ServerNotInitializedError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '015'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: "API server is not initialized"
 */
export class ServerNotInitializedError extends FullError {
  constructor() {
    super('API server is not initialized');
    this.name = 'ServerNotInitializedError';
    this.code = '015';
    this.status = 500;
  }
}
