
  export  interface Transaction {

        id: number;
      
        fromAccountNo: string;
      
        ToAccountNo: string;
      
        date: Date;
      
        amount: number;
      
        type: 'Debit' | 'Credit';
      
        description: string;
      
      }

