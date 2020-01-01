import MaterialTable, { Column } from "material-table";
import React from "react";
import { IUser } from "../model/User";
import Gravatar from "../utils/Gravatar";

interface IProps {
  users: IUser[];
  onAddUserClick: () => void;
  onDeleteUser: (user: IUser) => void;
  onEditUser: (oldUser: IUser, newUser: IUser) => boolean;
}

const UsersTable: React.FC<IProps> = (props: IProps) => {
  const { onDeleteUser, onEditUser, users } = props;

  const columns: Column<IUser>[] = [
    {
      title: "Gravatar",
      render: (row: IUser) => {
        if (!row.email) {
          return null;
        }

        const src = Gravatar.getUrl(row.email, 40);
        return <img src={src} alt={`Avatar for ${row.email}`} />;
      }
    },
    { field: "firstName", title: "First name" },
    { field: "lastName", title: "Last name" },
    { field: "gender", title: "Gender" },
    { field: "email", title: "Email address" },
    { field: "phone", title: "Phone number" }
  ];

  return (
    <MaterialTable
      actions={[
        {
          icon: "add",
          tooltip: "Add User",
          isFreeAction: true,
          onClick: props.onAddUserClick
        }
      ]}
      columns={columns}
      data={users}
      editable={{
        isEditable: () => true,
        isDeletable: () => true,
        onRowDelete: (rowData: IUser): Promise<void> => {
          onDeleteUser(rowData);
          return Promise.resolve();
        },
        // Weird typed used by onRowUpdate so we get any then cast
        onRowUpdate: (oldData: any, newData: any): Promise<void> => {
          const oldUser = oldData as IUser;
          const newUser = newData as IUser;

          if (onEditUser(oldUser, newUser)) {
            // Valid edit
            return Promise.resolve();
          }

          // Invalid edit
          return Promise.reject();
        }
      }}
      title="Users"
    />
  );
};

export default UsersTable;
