import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

interface Transaction {
  id: number;
  carType: string;
  licensePlate: string;
  price: number;
  washType: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = []; // Full list of transactions
  filteredTransactions: Transaction[] = []; // Filtered transactions
  filter = {
    date: '',
    status: ''
  };

  constructor() {}

  ngOnInit(): void {
    // Simulate fetching data from API
    this.transactions = [
      {
        id: 1,
        carType: 'SUV',
        licensePlate: 'ABC123',
        price: 500,
        washType: 'Lavage Normal',
        status: 'Pay & Collect',
        date: '2024-11-16'
      },
      {
        id: 2,
        carType: '4x4',
        licensePlate: 'XYZ789',
        price: 700,
        washType: 'Polissage',
        status: 'Paid',
        date: '2024-11-15'
      }
    ];
    this.filteredTransactions = [...this.transactions];
  }

  openModal(): void {
    const modalElement = document.getElementById('newTransactionModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesDate = this.filter.date ? transaction.date === this.filter.date : true;
      const matchesStatus = this.filter.status ? transaction.status === this.filter.status : true;
      return matchesDate && matchesStatus;
    });
  }

  payAndCollect(id: number): void {
    alert(`Pay & Collect for transaction ID ${id}`);
    // Simulate updating the transaction status
    const transaction = this.transactions.find(t => t.id === id);
    if (transaction) {
      transaction.status = 'Paid';
      this.applyFilters();
    }
  }

  collectCar(id: number): void {
    alert(`Car collected for transaction ID ${id}`);
    // Simulate updating the transaction status
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.applyFilters();
  }
}
