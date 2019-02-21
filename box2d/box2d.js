var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

var world;
//在canvas上的30像素表示Box2d世界中的一米
var scale = 30;

function init(){
    //创建Box2d world对象，该对象将完成大部分物理计算
    var gravity = new b2Vec2(0,9.8);//声明重力加速度为9.8m/s^2,方向向下
    var allowSleep = true;//允许静止的物体进入休眠状态，休眠物体不参与物理仿真计算
    world = new b2World(gravity,allowSleep);

    createFloor();
    //创建一些具有简单形状的物体
    createRectangularBody();
    createCircularBody();
    createSimplePloygonBody();
    //创建由两个形状组成的物体
    createComplexBody();
    //将两个物体用转动关节连接起来
    createRevoluteJoint();
    //创建具有自定义用户数据的对象
    createSpecialBody();
    //创建接触监听器并追踪事件
    listenForContact();

    setupDebugDraw();
    animate();
}

function createFloor(){
    //body的预定义对象，包含创建body刚体需要用到的所有数据
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 640/scale/2;
    bodyDef.position.y = 450/scale;
    
    //fixture用来向body添加shape以实现碰撞检测
    //fixture的预定义对象，用来建立fixture
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;//密度
    fixtureDef.friction = 0.5;//摩擦
    fixtureDef.restitution = 0.2;//恢复原状

    fixtureDef.shape = new b2PolygonShape;
    fixtureDef.shape.SetAsBox(320/scale,10/scale);//640像素宽，20像素高,原点在中心

    var body = world.CreateBody(bodyDef);
    var fixture = body.CreateFixture(fixtureDef);
}   

var context;
function setupDebugDraw(){
    context = document.getElementById("canvas").getContext("2d");
    var debugDraw = new b2DebugDraw();

    //使用canvas绘制环境来绘制调试画面
    debugDraw.SetSprite(context);
    //设置绘图比例
    debugDraw.SetDrawScale(scale);
    //填充的透明度为0.3
    debugDraw.SetFillAlpha(0.3);
    //线条的宽度为1
    debugDraw.SetLineThickness(1.0);
    //绘制所有的shape和joint
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    
    //设置调试绘图模式
    world.SetDebugDraw(debugDraw);
}

var timeStep = 1/60;
//按照Box2D手册建议的迭代数，速度是8，位置是3
var velocityIterations = 8;
var positionIterations = 3;

function animate(){
    world.Step(timeStep,velocityIterations,positionIterations);
    world.ClearForces();
    world.DrawDebugData();
    setTimeout(animate,timeStep);
}

function createRectangularBody(){
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = 40/scale;
    bodyDef.position.y = 100/scale;

    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.3;

    fixtureDef.shape = new b2PolygonShape;
    fixtureDef.shape.SetAsBox(30/scale,50/scale);

    var body = world.CreateBody(bodyDef);
    var fixture = body.CreateFixture(fixtureDef);
}

function createCircularBody(){
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = 130/scale;
    bodyDef.position.y = 100/scale;

    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.7;

    fixtureDef.shape = new b2CircleShape(30/scale);

    var body = world.CreateBody(bodyDef);
    var fixture = body.CreateFixture(fixtureDef);
}

function createSimplePloygonBody(){
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = 230/scale;
    bodyDef.position.y = 50/scale;

    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.2;
    fixtureDef.shape = new b2PolygonShape;

    //按顺时针方向创建一个b2Vec2顶点数组
    var points = [
        new b2Vec2(0,0),
        new b2Vec2(40/scale,50/scale),
        new b2Vec2(50/scale,100/scale),
        new b2Vec2(-50/scale,100/scale),
        new b2Vec2(-40/scale,50/scale),
    ];
    //调用SetAsArray()来使用顶点数组定义形状
    fixtureDef.shape.SetAsArray(points,points.length);

    var body = world.CreateBody(bodyDef);
    var fixture = body.CreateFixture(fixtureDef);
}

function createComplexBody(){
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = 350/scale;
    bodyDef.position.y = 50/scale;
    var body = world.CreateBody(bodyDef);

    //创建第一个载具并为物体添加圆形状
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.7;
    fixtureDef.shape = new b2CircleShape(40/scale);
    body.CreateFixture(fixtureDef);

    //创建第二个载具并为物体添加多边形形状
    fixtureDef.shape = new b2PolygonShape;
    var points = [
        new b2Vec2(0,0),
        new b2Vec2(40/scale,50/scale),
        new b2Vec2(50/scale,100/scale),
        new b2Vec2(-50/scale,100/scale),
        new b2Vec2(-40/scale,50/scale),
    ];
    fixtureDef.shape.SetAsArray(points,points.length);
    body.CreateFixture(fixtureDef);
}

function createRevoluteJoint(){
    //定义第一个物体
    var bodyDef1 = new b2BodyDef;
    bodyDef1.type = b2Body.b2_dynamicBody;
    bodyDef1.position.x = 480/scale;
    bodyDef1.position.y = 50/scale;
    var body1 = world.CreateBody(bodyDef1);

    //创建第一个载具并向物体添加矩形形状
    var fixtureDef1 = new b2FixtureDef;
    fixtureDef1.density = 1.0;
    fixtureDef1.friction = 0.5;
    fixtureDef1.restitution = 0.5;
    fixtureDef1.shape = new b2PolygonShape;
    fixtureDef1.shape.SetAsBox(50/scale,10/scale);
    body1.CreateFixture(fixtureDef1);

    //定义第二个物体
    var bodyDef2 = new b2BodyDef;
    bodyDef2.type = b2Body.b2_dynamicBody;
    bodyDef2.position.x = 470/scale;
    bodyDef2.position.y = 50/scale;
    var body2 = world.CreateBody(bodyDef2);

    //创建第二个载具并向物体中添加多边形形状
    var fixtureDef2 = new b2FixtureDef;
    fixtureDef2.density = 1.0;
    fixtureDef2.friction = 0.5;
    fixtureDef2.restitution = 0.5;
    fixtureDef2.shape = new b2PolygonShape;
    var points = [
        new b2Vec2(0,0),
        new b2Vec2(40/scale,50/scale),
        new b2Vec2(50/scale,100/scale),
        new b2Vec2(-50/scale,100/scale),
        new b2Vec2(-40/scale,50/scale),
    ];
    fixtureDef2.shape.SetAsArray(points,points.length);
    body2.CreateFixture(fixtureDef2)

    //创建接合点连接body1和body2
    var jointDef = new b2RevoluteJointDef;
    var jointCenter = new b2Vec2(470/scale,50/scale);

    jointDef.Initialize(body1,body2,jointCenter);
    world.CreateJoint(jointDef);
}

var specialBody;
function createSpecialBody(){
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = 450/scale;
    bodyDef.position.y = 0/scale;

    specialBody = world.CreateBody(bodyDef);
    specialBody.SetUserData(
        {
            name:"special",
            life:250
        }
    );

    //创建载具并向物体添加圆形状
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.5;

    fixtureDef.shape = new b2CircleShape(30/scale);
    var fixture = specialBody.CreateFixture(fixtureDef);
}

function listenForContact(){
    var listener = new Box2D.Dynamics.b2ContactListener;
    listener.PostSolve = function(contact,impulse){//接触，冲击力
        var body1 = contact.GetFixtureA().GetBody();
        var body2 = contact.GetFixtureB().GetBody();

        //如果接触的两个物体都具有生命值，则减少其生命值
        if(body1 == specialBody || body2 == specialBody){
            var impulseAlongNormal = impulse.normalImpulses[0];
            specialBody.GetUserData().life -= impulseAlongNormal;
            console.log("The special body was in a collision with impulse", 
            impulseAlongNormal, 
            "and its life has now become ", 
            specialBody.GetUserData().life);
        }
    };
    world.SetContactListener(listener);
}