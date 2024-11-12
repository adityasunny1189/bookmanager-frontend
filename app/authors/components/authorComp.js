import { Card, Avatar, Typography, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { EditOutlined, DeleteFilled, InfoCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

export default function Author({ author, deleteAuthor, editAuthor, openAuthor }) {
    return (
        <Card
            className="max-w-sm mx-auto my-4 shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-lg"
            actions={[
                <Tooltip title="View Details" key="info">
                    <InfoCircleFilled 
                        onClick={() => openAuthor(author)} 
                        className="text-blue-500 hover:text-blue-700" 
                    />
                </Tooltip>,
                <Tooltip title="Edit Author" key="edit">
                    <EditOutlined 
                        onClick={() => editAuthor(author)} 
                        className="text-green-500 hover:text-green-700" 
                    />
                </Tooltip>,
                <Tooltip title="Delete Author" key="delete">
                    <DeleteFilled 
                        onClick={() => deleteAuthor(author.id)} 
                        className="text-red-500 hover:text-red-700" 
                    />
                </Tooltip>,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" size="large" />}
                title={<Text className="text-lg font-semibold">{author.name}</Text>}
                description={<Text ellipsis={{ rows: 2 }} className="text-gray-600">{author.biography}</Text>}
            />
        </Card>
    );
};
