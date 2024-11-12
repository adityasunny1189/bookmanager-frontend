'use client';

import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Drawer, Input, DatePicker, message } from "antd";
import { useState } from "react";
import Author from "./components/authorComp";
import dayjs from 'dayjs';

const GET_AUTHORS = gql`
query GetAuthors {
  getAuthors {
    authors {
      biography
      name
      id
      bornDate
    }
  }
}
`;

const CREATE_AUTHOR = gql`
mutation CreateAuthor($name: String!, $biography: String!, $bornDate: Date!) {
  createAuthor(name: $name, biography: $biography, bornDate: $bornDate) {
    name
    id
    biography
    bornDate
  }
}
`;

const UPDATE_AUTHOR = gql`
mutation UpdateAuthor($id: ID!, $name: String, $biography: String) {
  updateAuthor(id: $id, name: $name, biography: $biography) {
    id
    name
    biography
    bornDate
  }
}
`;

const DELETE_AUTHOR = gql`
mutation DeleteAuthor($id: ID!) {
  deleteAuthor(id: $id) {
    id
    name
  }
}
`;

export default function AuthorPage() {
  const { loading, error, data, refetch } = useQuery(GET_AUTHORS);
  const [createAuthor] = useMutation(CREATE_AUTHOR);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR);

  const [drawerTitle, setDrawerTitle] = useState('Add Author');
  const [open, setOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [bornDate, setBornDate] = useState(null);

  const onClose = () => {
    setOpen(false);
    setEditingAuthor(null);
    setName('');
    setBiography('');
    setBornDate(null);
  };

  const openAddDrawer = () => {
    setDrawerTitle('Add Author');
    setOpen(true);
  };

  const openEditDrawer = (author) => {
    setEditingAuthor(author);
    setName(author.name);
    setBiography(author.biography);
    setBornDate(dayjs(author.bornDate));
    setDrawerTitle('Edit Author');
    setOpen(true);
  };

  const handleSave = async () => {
    console.log("Handle Save: ", name, biography, bornDate, editingAuthor);
    try {
      if (editingAuthor) {
        console.log("Editing Author: ", editingAuthor);
        // Update author
        await updateAuthor({
          variables: {
            id: editingAuthor.id,
            name,
            biography,
            bornDate: bornDate.toISOString(),
          },
          refetchQueries: [{ query: GET_AUTHORS }],
        });
        message.success('Author updated successfully');
      } else {
        // Create author
        await createAuthor({
          variables: {
            name,
            biography,
            bornDate: bornDate.toISOString(),
          },
          refetchQueries: [{ query: GET_AUTHORS }],
        });
        message.success('Author added successfully');
      }
      await refetch();
      onClose();
    } catch (err) {
      message.error('Error saving author');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor({
        variables: { id },
        refetchQueries: [{ query: GET_AUTHORS }],
      });
      message.success('Author deleted successfully');
      await refetch();
    } catch (err) {
      message.error('Error deleting author');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-xl mb-5">Authors Repository</h1>
        <Button type="primary" onClick={openAddDrawer}>Add Author</Button>
      </div>
      <div className="flex flex-wrap">
        {data.getAuthors.authors.map((author) => (
          <div className="w-1/5 px-2 my-4" key={author.id}>
            <Author 
                author={author} 
                editAuthor={openEditDrawer} 
                deleteAuthor={handleDelete} 
            />
          </div>
        ))}
      </div>
      <Drawer
        width={640}
        title={drawerTitle}
        onClose={onClose}
        open={open}
        footer={
          <div className="flex justify-end">
            <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>Save</Button>
          </div>
        }
      >
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">Biography</label>
          <Input.TextArea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">Born Date</label>
          <DatePicker
            value={bornDate}
            onChange={(date) => setBornDate(date)}
            style={{ width: '100%' }}
          />
        </div>
      </Drawer>
    </div>
  );
}
