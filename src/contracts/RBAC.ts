import { SmartContract, Field, PublicKey, method, state, State } from '@o1labs/mina-sdk';

export class RBAC extends SmartContract {
  @state(Map<PublicKey, Field>) roles = State<Map<PublicKey, Field>>();

  @method assignRole(userPublicKey: PublicKey, role: Field) {
    const rolesMap = this.roles.get();
    rolesMap.set(userPublicKey, role);
    this.roles.set(rolesMap);
  }

  @method accessRestrictedFeature(userPublicKey: PublicKey) {
    const rolesMap = this.roles.get();
    const userRole = rolesMap.get(userPublicKey);
    userRole.assertEquals(Field(1), 'Access denied: insufficient permissions');
  }
}
