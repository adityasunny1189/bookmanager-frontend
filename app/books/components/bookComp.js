import { Card, Avatar, Typography, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { EditOutlined, DeleteFilled, InfoCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

export const Book = ({ book, deleteBook, editBook, openBook }) => {
    return (
        <Card
            className="max-w-sm mx-auto my-4 shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-lg"
            actions={[
                <Tooltip title="View Details" key="info">
                    <InfoCircleFilled 
                        onClick={() => openBook(book)} 
                        className="text-blue-500 hover:text-blue-700" 
                    />
                </Tooltip>,
                <Tooltip title="Edit Book" key="edit">
                    <EditOutlined 
                        onClick={() => editBook(book)} 
                        className="text-green-500 hover:text-green-700" 
                    />
                </Tooltip>,
                <Tooltip title="Delete Book" key="delete">
                    <DeleteFilled 
                        onClick={() => deleteBook(book)} 
                        className="text-red-500 hover:text-red-700" 
                    />
                </Tooltip>,
            ]}
        >
            <Meta
                // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" size="large" />}
                title={<Text className="text-lg font-semibold">{book.title}</Text>}
                description={<Text ellipsis={{ rows: 2 }} className="text-gray-600">{book.description}</Text>}
            />
        </Card>
    );
};
