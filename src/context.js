import React, { Component } from 'react';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    getData = async () => {
        try {
            let response = await import('./data.js');
            if (response && response.default) {
                return this.handleData(response.default);
            } else {
                return this.handleData([]);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    handleData = items => {
        let rooms = this.formatData(items),
            featuredRooms = rooms.filter(room => room.featured === true),
            maxPrice = [Math.max(...rooms.map(item => item.price))],
            maxSize = [Math.max(...rooms.map(item => item.size))];

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
        });
    };

    componentDidMount() {
        this.getData();
    }

    formatData(items) {
        return items.map(item => {
            let id = item.sys.id,
                images = item.fields.images.map(image => image.fields.file.url),
                room = { ...item.fields, images, id };
            return room;
        });
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };

    handleChange = e => {
        const { target } = e,
            { name } = target,
            value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState(
            {
                [name]: value
            },
            this.filterRooms
        );
    };

    filterRooms = () => {
        let {
                capacity,
                minSize,
                maxSize,
                price,
                rooms,
                type,
                breakfast,
                pets
            } = this.state,
            tempRooms = [...rooms];

        capacity = parseInt(capacity);
        price = parseInt(price);

        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }
        tempRooms = tempRooms
            .filter(room => room.price <= price)
            .filter(room => room.size >= minSize && room.size <= maxSize);
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast);
        }
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets);
        }

        this.setState({
            sortedRooms: tempRooms
        });
    };

    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value} />}
            </RoomConsumer>
        );
    };
}

export { RoomProvider, RoomConsumer, RoomContext, withRoomConsumer };
