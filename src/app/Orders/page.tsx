import Link from "next/link";

const OrderPage = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-180px)] items-center justify-center">
      <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
        <h1 className="text-xl">Order Details</h1>
        <div className="mt-12 flex flex-col gap-6">
          <div>
            <span className="font-medium">Order Id: </span>
            <span>123456</span>
          </div>
          <div>
            <span className="font-medium">Receiver Name: </span>
            <span>John Doe</span>
          </div>
          <div>
            <span className="font-medium">Receiver Email: </span>
            <span>john@example.com</span>
          </div>
          <div>
            <span className="font-medium">Price: </span>
            <span>99.99</span>
          </div>
          <div>
            <span className="font-medium">Payment Status: </span>
            <span>PAID</span>
          </div>
          <div>
            <span className="font-medium">Order Status: </span>
            <span>IN_PROGRESS</span>
          </div>
          <div>
            <span className="font-medium">Delivery Address: </span>
            <span>123 Main St, New York</span>
          </div>
        </div>
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
    </div>
  );
};

export default OrderPage;