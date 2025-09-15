
  export  interface Transaction {

        id: number;
      
        fromAccountNo: string;
      
        ToAccountNo: string;
      
        date: Date;
      
        amount: number;
      
        type: 'debit' | 'credit';
      
        description: string;
      
      }

