import Link from "next/link";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/add">Add User</Link>
            </li>
          </ul>
        </nav>
        <div>{children}</div>
      </div>
    );
  };
  
  export default Layout;