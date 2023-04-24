import {List, ListItem, Box,ListSubheader, ListItemButton} from '@mui/joy';

function MainBoard() {
    return (
        <div className='container' >
            <div style={{display: 'flex'}}>
                <div >
                    <Box ml={7}>
                        <List variant="outlined" sx={{ width: 300, bgcolor: 'background.body', borderRadius: 'sm',boxShadow: 'sm'}} >
                            <ListItem nested>
                                <ListSubheader>예금상품추천</ListSubheader>
                                <List>
                                    <ListItem>
                                        <ListItemButton>예금상품 1</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>예금상품 2</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>예금상품 3</ListItemButton>
                                    </ListItem>
                                </List>
                            </ListItem>
                            <ListItem nested>
                                <ListSubheader>적금상품추천</ListSubheader>
                                <List>
                                    <ListItem>
                                        <ListItemButton>적금상품 1</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>적금상품 2</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>적금상품 3</ListItemButton>
                                    </ListItem>
                                </List>
                            </ListItem>
                        </List>
                    </Box>
                </div>
                <div>    
                    <Box  ml={7}>
                        <List variant="outlined" sx={{ width: 300, bgcolor: 'background.body', borderRadius: 'sm', boxShadow: 'sm'}} >
                            <ListItem nested>
                                <ListSubheader>대출상품추천</ListSubheader>
                                <List>
                                    <ListItem>
                                        <ListItemButton>대출상품 1</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>대출상품 2</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>대출상품 3</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>대출상품 4</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>대출상품 5</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>대출상품 6</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>대출상품 7</ListItemButton>
                                    </ListItem>
                                </List>
                            </ListItem>
                        </List>
                    </Box>
                </div>
                <div>              
                    <Box  ml={7}>
                        <List variant="outlined" sx={{ width: 300, bgcolor: 'background.body', borderRadius: 'sm', boxShadow: 'sm'}}>
                            <ListItem nested>
                                <ListSubheader>공지사항</ListSubheader>
                                <List>
                                    <ListItem>
                                        <ListItemButton>공지사항 1</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>공지사항 2</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>공지사항 3</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>공지사항 4</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>공지사항 5</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>공지사항 6</ListItemButton>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemButton>공지사항 7</ListItemButton>
                                    </ListItem>
                                </List>
                            </ListItem>
                        </List>
                    </Box>
                </div>
            </div>
        </div>
    )
}
export default MainBoard;