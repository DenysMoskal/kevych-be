import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'differentStations', async: false })
export class DifferentStationsValidator
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = args.object[relatedPropertyName];
    return value !== relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must be different from ${relatedPropertyName}`;
  }
}
