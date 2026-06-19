import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '@shared/models/customer.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private customersCollection: AngularFirestoreCollection<Customer>;
  private readonly COLLECTION_NAME = 'customers';

  constructor(private firestore: AngularFirestore) {
    this.customersCollection = this.firestore.collection<Customer>(this.COLLECTION_NAME);
  }

  getCustomers(): Observable<Customer[]> {
    return this.customersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Customer;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  createCustomer(customer: Customer): Promise<void> {
    const id = this.firestore.createId();
    return this.customersCollection.doc(id).set({
      ...customer,
      createdAt: new Date()
    });
  }

  deleteCustomer(id: string): Promise<void> {
    return this.customersCollection.doc(id).delete();
  }
}