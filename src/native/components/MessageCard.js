<Card style={styles.card}>
<CardItem
    header
    style={{
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0
    }}
>
    <Image source={require("../assets/images/msg-success.png")} />
</CardItem>
<CardItem style={styles.cardBody}>
    {/* aqui colocar el condicional */}
    <Body>
    <Text
        style={[styles.header, styles.successMsg, styles.textCenter]}
    >
        ¡Eres una vendedora super poderosa!
    </Text>
    <Text style={[styles.meta, styles.date]}>Hace 26 minutos</Text>
    <Spacer size={8} />
    <Text style={styles.description}>
        Tus ventas de la semana pasada te colocan dentro de nuestras
        mejores 50 vendedoras. ¡Felicitaciones!
    </Text>
    <Spacer size={16} />
    </Body>
    {/* aqui terminar el condicional */}
</CardItem>
<CardItem style={styles.cardFooter} footer bordered>
    {/*
    <Left>
    <Button
        style={styles.cardButton}
        block
        transparent
        info
        smallheaderMessage
        iconLeft
        onPress={() => onPress(item)}
    >
        <Icon type="SimpleLineIcons" name="heart" />
        <Text style={styles.cardButtonText}>Me encanta</Text>
    </Button>
    </Left>
    <Right>
    <Button
        style={styles.cardButton}
        block
        transparent
        info
        small
        iconLeft
        onPress={() => {
        Share.share(
            {
            message:
                "¡Conviertete cómo yo en una vendedora super poderosa con Elenas!"
            },
            {}
        );
        }}
    >
        <Icon type="SimpleLineIcons" name="share-alt" />
        <Text style={styles.cardButtonText}>Compartir</Text>
    </Button>
    </Right> */}
    <Body>
    <Button
        style={styles.cardButton}
        block
        transparent
        info
        small
        iconLeft
        onPress={() => {
        Share.share(
            {
            message:
                "¡Conviertete cómo yo en una vendedora super poderosa con Elenas!"
            },
            {}
        );
        }}
    >
        <Icon type="SimpleLineIcons" name="share-alt" />
        <Text style={styles.cardButtonText}>Compartir</Text>
    </Button>
    </Body>
</CardItem>
</Card>