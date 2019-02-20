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